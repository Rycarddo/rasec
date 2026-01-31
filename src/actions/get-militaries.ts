"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth, hasPermission } from "@/lib/auth-guard";

// Funções para mascarar dados sensíveis
function maskCPF(cpf: string): string {
  if (!cpf || cpf.length < 11) return "***.***.***-**";
  return `${cpf.slice(0, 3)}.***.***.${cpf.slice(-2)}`;
}

function maskPhone(phone: string): string {
  if (!phone || phone.length < 10) return "(XX) XXXXX-XXXX";
  return `(${phone.slice(0, 2)}) *****-${phone.slice(-4)}`;
}

function maskEmail(email: string): string {
  if (!email) return "***@***.***";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***@***.***";
  const maskedLocal = localPart.slice(0, 2) + "***";
  return `${maskedLocal}@${domain}`;
}

export const getMilitaries = async () => {
  // Verificar autenticação - qualquer usuário autenticado pode visualizar
  const authResult = await requireAuth("READONLY");

  if (!authResult.authorized) {
    return {
      success: false,
      error: authResult.error || "Acesso não autorizado",
    };
  }

  // Determinar se o usuário pode ver dados completos (ADMIN/OPERATOR)
  const canViewFullData = authResult.user
    ? hasPermission(authResult.user.role, "OPERATOR")
    : false;

  try {
    const militaries = await prisma.military.findMany({
      where: {
        visible: true,
      },
      include: {
        qualifications: true,
        operationalTests: {
          orderBy: {
            testAt: "desc",
          },
          take: 1,
        },
        theoreticalTestDates: {
          orderBy: {
            testAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        fullName: "asc",
      },
    });

    // Mascarar dados sensíveis para usuários READONLY
    const sanitizedMilitaries = militaries.map((military) => ({
      ...military,
      cpf: canViewFullData ? military.cpf : maskCPF(military.cpf),
      phone: canViewFullData ? military.phone : maskPhone(military.phone),
      email: canViewFullData ? military.email : maskEmail(military.email),
      identity: canViewFullData ? military.identity : "***",
    }));

    return { success: true, data: sanitizedMilitaries };
  } catch (error) {
    console.error("Erro ao buscar militares:", error);
    return { success: false, error: "Erro ao buscar militares" };
  }
};
