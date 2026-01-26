import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  const pathname = request.nextUrl.pathname;
  const isRootPage = pathname === "/";
  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/dashboard");

  // Rota "/" - redireciona baseado no estado de autenticação
  if (isRootPage) {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Se não tem sessão e está tentando acessar página protegida
  if (!sessionToken && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem sessão e está tentando acessar página de login
  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
