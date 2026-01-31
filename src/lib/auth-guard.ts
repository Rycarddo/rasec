"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { hasPermission, type UserRole } from "@/lib/auth-utils";

interface AuthResult {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
  error?: string;
}

/**
 * Verifica se o usuário está autenticado e retorna os dados da sessão.
 * Use esta função em todas as server actions para proteger rotas.
 */
export async function getAuthenticatedUser(): Promise<AuthResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        authenticated: false,
        error: "Não autenticado",
      };
    }

    return {
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: (session.user.role as UserRole) || "READONLY",
      },
    };
  } catch {
    return {
      authenticated: false,
      error: "Erro ao verificar autenticação",
    };
  }
}

/**
 * Helper para verificar autenticação e autorização de uma vez.
 */
export async function requireAuth(
  requiredRole: UserRole = "READONLY"
): Promise<AuthResult & { authorized: boolean }> {
  const authResult = await getAuthenticatedUser();

  if (!authResult.authenticated || !authResult.user) {
    return {
      ...authResult,
      authorized: false,
    };
  }

  const authorized = hasPermission(authResult.user.role, requiredRole);

  if (!authorized) {
    return {
      ...authResult,
      authorized: false,
      error: "Sem permissão para esta ação",
    };
  }

  return {
    ...authResult,
    authorized: true,
  };
}
