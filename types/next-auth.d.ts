import NextAuth, { DefaultSession } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "Admin" | "User"; // 중복 제거 및 타입 고정
      kakaoId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // id 추가 (Credentials 로그인 시 필요)
    role: "Admin" | "User";
    kakaoId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "Admin" | "User";
    kakaoId?: string; // 카카오 로그인이 아닐 수도 있으므로 ? 추가
  }
}
