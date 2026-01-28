"use server";

import { prisma } from "@/lib/prisma";

export const getMilitaries = async () => {
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

    return { success: true, data: militaries };
  } catch (error) {
    console.error("Erro ao buscar militares:", error);
    return { success: false, error: "Erro ao buscar militares" };
  }
};
