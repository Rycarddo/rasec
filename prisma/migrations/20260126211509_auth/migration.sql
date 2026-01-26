-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OPERATOR', 'READONLY');

-- CreateEnum
CREATE TYPE "Section" AS ENUM ('COM', 'CIVA', 'FIS', 'OPG', 'SAR', 'DT', 'DTCEA_BE', 'DTCEA_BV', 'DTCEA_PV', 'DTCEA_GM');

-- CreateEnum
CREATE TYPE "MilitarySituation" AS ENUM ('ESCALA', 'EXPEDIENTE', 'AFASTADO');

-- CreateEnum
CREATE TYPE "MilitaryRank" AS ENUM ('Rank_SO', 'Rank_1S', 'Rank_2S', 'Rank_3S');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'READONLY',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Military" (
    "id" TEXT NOT NULL,
    "militaryRank" "MilitaryRank" NOT NULL,
    "fullName" TEXT NOT NULL,
    "warName" TEXT NOT NULL,
    "section" "Section" NOT NULL,
    "situation" "MilitarySituation" NOT NULL,
    "maintenance" BOOLEAN NOT NULL,
    "identity" TEXT NOT NULL,
    "saram" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "lpna" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDateAt" TIMESTAMP(3) NOT NULL,
    "graduatedAt" TIMESTAMP(3) NOT NULL,
    "lastPromotedAt" TIMESTAMP(3) NOT NULL,
    "pracaAt" TIMESTAMP(3) NOT NULL,
    "presentationDate" TIMESTAMP(3) NOT NULL,
    "htValidityAt" TIMESTAMP(3) NOT NULL,
    "inspsauValidityAt" TIMESTAMP(3) NOT NULL,
    "examiner" BOOLEAN NOT NULL,
    "areaTimeAt" TIMESTAMP(3) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Military_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" TEXT NOT NULL,
    "militaryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationalTest" (
    "id" TEXT NOT NULL,
    "militaryId" TEXT NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,
    "testAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OperationalTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TheoreticalTest" (
    "id" TEXT NOT NULL,
    "militaryId" TEXT NOT NULL,
    "testAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TheoreticalTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Military_identity_key" ON "Military"("identity");

-- CreateIndex
CREATE UNIQUE INDEX "Military_saram_key" ON "Military"("saram");

-- CreateIndex
CREATE UNIQUE INDEX "Military_cpf_key" ON "Military"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Military_lpna_key" ON "Military"("lpna");

-- CreateIndex
CREATE UNIQUE INDEX "Military_phone_key" ON "Military"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Military_email_key" ON "Military"("email");

-- CreateIndex
CREATE INDEX "Military_section_idx" ON "Military"("section");

-- CreateIndex
CREATE INDEX "Military_militaryRank_idx" ON "Military"("militaryRank");

-- CreateIndex
CREATE INDEX "Military_situation_idx" ON "Military"("situation");

-- CreateIndex
CREATE INDEX "Military_visible_idx" ON "Military"("visible");

-- CreateIndex
CREATE INDEX "Military_htValidityAt_idx" ON "Military"("htValidityAt");

-- CreateIndex
CREATE INDEX "Military_inspsauValidityAt_idx" ON "Military"("inspsauValidityAt");

-- CreateIndex
CREATE INDEX "Qualification_militaryId_idx" ON "Qualification"("militaryId");

-- CreateIndex
CREATE INDEX "Qualification_name_idx" ON "Qualification"("name");

-- CreateIndex
CREATE INDEX "OperationalTest_militaryId_idx" ON "OperationalTest"("militaryId");

-- CreateIndex
CREATE INDEX "OperationalTest_testAt_idx" ON "OperationalTest"("testAt");

-- CreateIndex
CREATE INDEX "TheoreticalTest_militaryId_idx" ON "TheoreticalTest"("militaryId");

-- CreateIndex
CREATE INDEX "TheoreticalTest_testAt_idx" ON "TheoreticalTest"("testAt");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_militaryId_fkey" FOREIGN KEY ("militaryId") REFERENCES "Military"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalTest" ADD CONSTRAINT "OperationalTest_militaryId_fkey" FOREIGN KEY ("militaryId") REFERENCES "Military"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoreticalTest" ADD CONSTRAINT "TheoreticalTest_militaryId_fkey" FOREIGN KEY ("militaryId") REFERENCES "Military"("id") ON DELETE CASCADE ON UPDATE CASCADE;
