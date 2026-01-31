import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError } from "better-auth/api";
import { prisma } from "@/lib/prisma";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.BETTER_AUTH_URL!],

  // Configurações avançadas de segurança
  advanced: {
    useSecureCookies: isProduction,
    cookiePrefix: "rasec",
    // Proteção contra CSRF
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  // Configurações de sessão
  session: {
    expiresIn: 60 * 60 * 8, // 8 horas
    updateAge: 60 * 15, // Atualiza a cada 15 minutos
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // Cache de 5 minutos
    },
  },

  // Rate limiting para proteção contra brute force
  rateLimit: {
    window: 60, // 1 minuto
    max: 10, // Máximo 10 tentativas por minuto
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "READONLY",
        input: false,
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Sanitizar email antes de verificar
          const sanitizedEmail = user.email.toLowerCase().trim();

          const allowedEmail = await prisma.allowedEmail.findUnique({
            where: { email: sanitizedEmail },
          });

          if (!allowedEmail) {
            // Log de tentativa de acesso não autorizado
            console.warn(`[SECURITY] Tentativa de registro com email não autorizado: ${sanitizedEmail}`);
            throw new APIError("FORBIDDEN", {
              message: "Email não autorizado",
            });
          }

          return {
            data: {
              ...user,
              email: sanitizedEmail,
              name: allowedEmail.name,
              role: allowedEmail.role,
            },
          };
        },
      },
    },
  },
});
