import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
const kakaoClientId = process.env.KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;

if (!kakaoClientId || !kakaoClientSecret) {
  throw new Error(
    "KAKAO_CLIENT_ID 또는 KAKAO_CLIENT_SECRET 환경 변수가 설정되지 않았습니다."
  );
}
export const runtime = "nodejs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: kakaoClientId,
      clientSecret: kakaoClientSecret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          throw new Error("존재하지 않는 계정입니다.");
        }
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordMatch) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }
        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // 1. 최초 로그인 시 (카카오 혹은 Credentials)
      if (account && user) {
        if (account.provider === "kakao") {
          const kakaoId = String(account.providerAccountId);
          const dbUser = await prisma.user.upsert({
            where: { kakaoId },
            update: {
              name: token.name,
              email: token.email,
              image: token.picture,
            },
            create: {
              kakaoId,
              name: token.name,
              email: token.email,
              image: token.picture,
              role: "User",
            },
          });

          token.id = dbUser.id;
          token.role = dbUser.role; // DB에서 가져온 role 주입
          token.kakaoId = kakaoId;
        } else {
          // Credentials 로그인 시
          token.id = user.id;
          token.role = user.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // 아까 빌드 에러 해결을 위해 꼭 필요!
        // ✅ kakaoId는 카카오 로그인일 때만 존재할 수 있으므로 undefined 안전 처리
        session.user.kakaoId = token.kakaoId
          ? String(token.kakaoId)
          : undefined;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
