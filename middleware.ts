import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret });

  /* 1️⃣ 로그인 페이지 접근 처리 */
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/my", request.url));
    }
    return NextResponse.next();
  }

  /* 2️⃣ 보호 페이지 여부 */
  const isProtectedPage =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/my");

  /* 3️⃣ 로그인 안 한 경우 */
  if (isProtectedPage && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /* 4️⃣ 🔥 Admin 전용 페이지 권한 체크 */
  if (pathname.startsWith("/admin")) {
    if (token?.role !== "Admin") {
      // 권한 없는 경우 → 메인 페이지 or 403 페이지
      return NextResponse.redirect(new URL("/", request.url));
      // 또는:
      // return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
