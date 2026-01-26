// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret });

  console.log("=========================================");
  console.log("요청 경로:", pathname);
  console.log("읽어온 토큰:", token); // 토큰 전체 내용 확인
  console.log("토큰 Role:", token?.role); // 토큰에 'admin'이 제대로 있는지 확인
  console.log("=========================================");
  const isProtectedPage =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout");
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "Admin") {
      console.log("접근 거부: 리다이렉트 실행");
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    console.log("접근 허용: 관리자 접근 통과");
  }

  return NextResponse.next();
}

// 💡 config 객체는 선택 사항이지만, 일반적으로 함께 export 됩니다.
export const config = {
  matcher: ["/admin/:path*", "/login", "/cart", "/checkout"],
};
