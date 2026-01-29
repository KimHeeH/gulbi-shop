// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 로그인 페이지 자체는 미들웨어 로직을 타지 않게 즉시 통과시킵니다.
  if (pathname === "/login") {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret });

  // 2. 어드민 체크 (가장 먼저 수행)
  if (pathname === "/" && token?.role === "Admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // 3. 보호된 페이지 체크
  const isProtectedPage =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout");

  if (isProtectedPage && !token) {
    // 여기서 /login으로 보낼 때, 원래 가려던 주소를 남겨두면 나중에 편리합니다.
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
// middleware.ts 의 config 부분
export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 요청에 미들웨어 적용:
     * 1. api (API 라우트)
     * 2. _next/static (정적 파일)
     * 3. _next/image (이미지 최적화 파일)
     * 4. favicon.ico (파비콘)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
