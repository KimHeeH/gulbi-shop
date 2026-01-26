// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret });

  // ⚠️ 보안: 프로덕션에서는 토큰 정보를 절대 로깅하지 않습니다
  // 개발 환경에서만 디버깅이 필요한 경우 process.env.NODE_ENV === 'development' 조건을 사용하세요

  const isProtectedPage =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout");
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "Admin") {
      // 보안: 접근 거부 로그도 프로덕션에서는 제거
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    // 보안: 접근 허용 로그도 프로덕션에서는 제거
  }

  return NextResponse.next();
}

// 💡 config 객체는 선택 사항이지만, 일반적으로 함께 export 됩니다.
export const config = {
  matcher: ["/admin/:path*", "/login", "/cart", "/checkout"],
};
