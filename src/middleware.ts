import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware de autenticação - Edge Runtime compatível
 *
 * NOTA: Não usa Prisma/Better Auth diretamente pois Edge Runtime não suporta módulos Node.js.
 * A validação REAL da sessão é feita nas server actions via auth-guard.ts.
 * O middleware apenas faz verificação básica do cookie para redirecionamento.
 */
export async function middleware(request: NextRequest) {
  // Verificar presença do cookie de sessão (Better Auth padrão)
  const sessionToken =
    request.cookies.get("rasec.session_token")?.value ||
    request.cookies.get("__Secure-rasec.session_token")?.value ||
    // Fallback para cookies sem prefix (compatibilidade)
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const pathname = request.nextUrl.pathname;
  const isRootPage = pathname === "/";
  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/dashboard");

  // Rota "/" - redireciona baseado na presença do cookie
  if (isRootPage) {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Se não tem cookie e está tentando acessar página protegida
  if (!sessionToken && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem cookie e está tentando acessar página de login
  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
