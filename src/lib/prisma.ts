import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Singleton pattern para evitar múltiplas conexões em desenvolvimento
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Configurações de segurança do pool
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    // SSL em produção
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
  });

  const adapter = new PrismaPg(pool);
  return { client: new PrismaClient({ adapter }), pool };
}

if (!globalForPrisma.prisma) {
  const { client, pool } = createPrismaClient();
  globalForPrisma.prisma = client;
  globalForPrisma.pool = pool;
}

export const prisma = globalForPrisma.prisma;
