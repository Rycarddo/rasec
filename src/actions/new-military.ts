"use server";

import { prisma } from "@/utils/prisma";

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
  examiner: string;
  areaTimeAt: Date;
  operationalScore?: string;
  theoreticalDate?: Date;
}

const newMilitary = async (data: NewMilitaryData) => {
  try {
    const military = await prisma.military.create({
      data: {
        militaryRank: data.militaryRank as any,
        fullName: data.fullName,
        warName: data.warName,
        section: data.section as any,
        situation: data.situation as any,
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
    return { success: false, error: "Erro ao cadastrar militar" };
  }
};

export default newMilitary;
