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
  advanced: {
    useSecureCookies: isProduction,
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
          const allowedEmail = await prisma.allowedEmail.findUnique({
            where: { email: user.email },
          });

          if (!allowedEmail) {
            throw new APIError("FORBIDDEN", {
              message: "Email não autorizado",
            });
          }

          return {
            data: {
              ...user,
              name: allowedEmail.name,
              role: allowedEmail.role,
            },
          };
        },
      },
    },
  },
});
