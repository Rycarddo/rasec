"use server";

import { prisma } from "@/utils/prisma";
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

const newMilitary = async (data: NewMilitaryData) => {
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

    const military = await prisma.military.create({
      data: {
        militaryRank: rankMap[data.militaryRank] || MilitaryRank.Rank_SO,
        fullName: data.fullName,
        warName: data.warName,
        section: sectionMap[data.section] || Section.COM,
        situation: situationMap[data.situation] || MilitarySituation.EXPEDIENTE,
        maintenance: data.maintenance,
        identity: data.identity,
        saram: data.saram,
        cpf: data.cpf,
        lpna: data.lpna,
        phone: data.phone,
        email: data.email,
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
            name: qual,
          })),
        },
      },
    });

    return { success: true, data: military };
  } catch (error) {
    console.error("Erro ao cadastrar militar:", error);

    // Melhor tratamento de erro para identificar o problema
    let errorMessage = "Erro ao cadastrar militar";

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        errorMessage =
          "Já existe um militar com esses dados (CPF, Email, Telefone, etc.)";
      } else {
        errorMessage = error.message;
      }
    }

    return { success: false, error: errorMessage };
  }
};

export default newMilitary;
