// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret });

  const isProtectedPage =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout");
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/" && token?.role === "Admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "Admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 💡 config 객체는 선택 사항이지만, 일반적으로 함께 export 됩니다.
export const config = {
  matcher: [
    /*
     * 1. 관리자 전용 페이지 (전체 보호)
     * /admin, /admin/products, /admin/orders 등 모든 하위 경로 포함
     */
    "/admin/:path*",

    /*
     * 2. 일반 유저 필수 보호 페이지
     * 로그인을 안 한 상태로 접근하면 /login으로 보내야 하는 곳들
     */
    "/cart/:path*", // 장바구니 및 하위 경로
    "/checkout/:path*", // 결제 페이지 및 하위 경로
    "/order/:path*",
    "/my/orders/:path*", // 내 주문 내역 페이지 (파일명이 이렇다면 추가)

    /*
     * 3. 로그인/회원가입 페이지
     * 이미 로그인한 유저가 접속했을 때 메인으로 튕겨내기 위해 감시 대상에 포함
     */
    "/login",
    "/signup",
  ],
};
