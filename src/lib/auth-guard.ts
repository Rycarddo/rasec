"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type UserRole = "ADMIN" | "OPERATOR" | "READONLY";

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
 * Verifica se o usuário tem permissão para executar uma ação baseado no role.
 * ADMIN: pode fazer tudo
 * OPERATOR: pode ler e criar/editar
 * READONLY: pode apenas ler
 */
export function hasPermission(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    READONLY: 1,
    OPERATOR: 2,
    ADMIN: 3,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
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
