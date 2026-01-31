import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isRootPage = pathname === "/";
  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/dashboard");

  // Validar sessão de forma segura usando Better Auth
  let isValidSession = false;

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    isValidSession = !!session?.user;
  } catch {
    isValidSession = false;
  }

  // Rota "/" - redireciona baseado no estado de autenticação
  if (isRootPage) {
    if (isValidSession) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Se não tem sessão válida e está tentando acessar página protegida
  if (!isValidSession && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem sessão válida e está tentando acessar página de login
  if (isValidSession && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
