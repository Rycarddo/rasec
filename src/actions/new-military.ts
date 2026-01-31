"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";
import {
  MilitaryRank,
  Section,
  MilitarySituation,
} from "../../generated/prisma/enums";

interface NewMilitaryData {
  militaryRank: string;
  fullName: string;
  warName: string;
  section: string;
  situation: string;
  qualifications: string[];
  maintenance: boolean;
  identity: string;
  saram: string;
  cpf: string;
  lpna: string;
  phone: string;
  email: string;
  birthDateAt: Date;
  graduatedAt: Date;
  lastPromotedAt: Date;
  pracaAt: Date;
  presentationDate: Date;
  htValidityAt: Date;
  inspsauValidityAt: Date;
  examiner: boolean;
  areaTimeAt: Date;
  operationalScore?: string;
  theoreticalDate?: Date;
}

// Funções de validação
function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF[10])) return false;

  return true;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, "");
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

function isValidDate(date: Date): boolean {
  if (!(date instanceof Date) || isNaN(date.getTime())) return false;
  const year = date.getFullYear();
  // Aceitar datas entre 1900 e 2100 (range razoável)
  return year >= 1900 && year <= 2100;
}

function validateAllDates(data: NewMilitaryData): string | null {
  const dateFields: { name: string; value: Date }[] = [
    { name: "Data de nascimento", value: data.birthDateAt },
    { name: "Data de formatura", value: data.graduatedAt },
    { name: "Última promoção", value: data.lastPromotedAt },
    { name: "Data de praça", value: data.pracaAt },
    { name: "Data de apresentação", value: data.presentationDate },
    { name: "Validade HT", value: data.htValidityAt },
    { name: "Validade INSPSAU", value: data.inspsauValidityAt },
    { name: "Tempo de área", value: data.areaTimeAt },
  ];

  for (const field of dateFields) {
    if (!isValidDate(field.value)) {
      return `${field.name} inválida`;
    }
  }

  return null;
}

function sanitizeString(str: string, maxLength: number = 255): string {
  if (!str) return "";
  return str
    .trim()
    .slice(0, maxLength) // Limitar tamanho para prevenir DoS
    .replace(/[<>'"&\\]/g, "") // Remover caracteres perigosos para XSS
    .replace(/[\x00-\x1F\x7F]/g, ""); // Remover caracteres de controle
}

const newMilitary = async (data: NewMilitaryData) => {
  // Verificar autenticação - requer OPERATOR ou superior
  const authResult = await requireAuth("OPERATOR");

  if (!authResult.authorized) {
    return {
      success: false,
      error: authResult.error || "Acesso não autorizado",
    };
  }

  // Validação de campos obrigatórios
  if (!data.fullName || !data.warName || !data.militaryRank) {
    return { success: false, error: "Campos obrigatórios não preenchidos" };
  }

  // Validação de CPF
  if (!isValidCPF(data.cpf)) {
    return { success: false, error: "CPF inválido" };
  }

  // Validação de email
  if (!isValidEmail(data.email)) {
    return { success: false, error: "Email inválido" };
  }

  // Validação de telefone
  if (!isValidPhone(data.phone)) {
    return { success: false, error: "Telefone inválido" };
  }

  // Validação de datas
  const dateError = validateAllDates(data);
  if (dateError) {
    return { success: false, error: dateError };
  }

  try {
    // Converter militaryRank para o formato do enum
    const rankMap: Record<string, MilitaryRank> = {
      SO: MilitaryRank.Rank_SO,
      "1S": MilitaryRank.Rank_1S,
      "2S": MilitaryRank.Rank_2S,
      "3S": MilitaryRank.Rank_3S,
    };

    // Converter section para uppercase
    const sectionMap: Record<string, Section> = {
      com: Section.COM,
      civa: Section.CIVA,
      fis: Section.FIS,
      sar: Section.SAR,
      opg: Section.OPG,
      dt: Section.DT,
      "dtcea-br": Section.DTCEA_BE,
      "dtcea-bv": Section.DTCEA_BV,
      "dtcea-pv": Section.DTCEA_PV,
      "dtcea-gm": Section.DTCEA_GM,
    };

    // Converter situation para uppercase
    const situationMap: Record<string, MilitarySituation> = {
      expediente: MilitarySituation.EXPEDIENTE,
      escala: MilitarySituation.ESCALA,
      "nao-aplicavel": MilitarySituation.AFASTADO,
    };

    // Sanitizar dados de entrada
    const sanitizedData = {
      fullName: sanitizeString(data.fullName),
      warName: sanitizeString(data.warName),
      identity: sanitizeString(data.identity),
      saram: sanitizeString(data.saram),
      cpf: data.cpf.replace(/\D/g, ""),
      lpna: sanitizeString(data.lpna),
      phone: data.phone.replace(/\D/g, ""),
      email: data.email.toLowerCase().trim(),
    };

    // Log de auditoria
    console.info(
      `[AUDIT] Usuário ${authResult.user?.email} (${authResult.user?.role}) criando novo militar: ${sanitizedData.warName}`
    );

    const military = await prisma.military.create({
      data: {
        militaryRank: rankMap[data.militaryRank] || MilitaryRank.Rank_SO,
        fullName: sanitizedData.fullName,
        warName: sanitizedData.warName,
        section: sectionMap[data.section] || Section.COM,
        situation: situationMap[data.situation] || MilitarySituation.EXPEDIENTE,
        maintenance: data.maintenance,
        identity: sanitizedData.identity,
        saram: sanitizedData.saram,
        cpf: sanitizedData.cpf,
        lpna: sanitizedData.lpna,
        phone: sanitizedData.phone,
        email: sanitizedData.email,
        birthDateAt: data.birthDateAt,
        graduatedAt: data.graduatedAt,
        lastPromotedAt: data.lastPromotedAt,
        pracaAt: data.pracaAt,
        presentationDate: data.presentationDate,
        htValidityAt: data.htValidityAt,
        inspsauValidityAt: data.inspsauValidityAt,
        examiner: data.examiner,
        areaTimeAt: data.areaTimeAt,
        qualifications: {
          create: data.qualifications.map((qual) => ({
            name: sanitizeString(qual),
          })),
        },
      },
    });

    return { success: true, data: military };
  } catch (error) {
    // Log interno para debugging (não expõe ao cliente)
    console.error("Erro ao cadastrar militar:", error);

    // Mensagens genéricas para o cliente (sem expor detalhes internos)
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return {
          success: false,
          error: "Já existe um militar com esses dados (CPF, Email, Telefone, etc.)",
        };
      }
    }

    // Mensagem genérica para outros erros
    return { success: false, error: "Erro ao cadastrar militar" };
  }
};

export default newMilitary;
