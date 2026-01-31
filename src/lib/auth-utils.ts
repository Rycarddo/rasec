/**
 * Funções utilitárias de autenticação (síncronas)
 * Este arquivo NÃO tem "use server" pois contém funções síncronas
 */

export type UserRole = "ADMIN" | "OPERATOR" | "READONLY";

// Hierarquia de roles para verificação de permissões
const roleHierarchy: Record<UserRole, number> = {
  READONLY: 1,
  OPERATOR: 2,
  ADMIN: 3,
};

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
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
