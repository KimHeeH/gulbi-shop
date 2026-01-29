import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
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

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
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

        // ⚠️ 보안: 계정 존재 여부를 노출하지 않기 위해 통일된 에러 메시지 사용
        // 사용자가 존재하지 않거나 비밀번호가 없거나 비밀번호가 틀린 경우 모두 동일한 메시지 반환
        // 타이밍 공격 방지를 위해 항상 bcrypt.compare를 실행
        const dummyHash =
          "$2b$10$dummyHashForTimingAttackPrevention1234567890123456789012";
        const userPasswordHash = user?.password || dummyHash;

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          userPasswordHash
        );

        // 사용자가 없거나 비밀번호가 틀린 경우 동일한 에러 메시지 반환
        if (!user || !user.password || !isPasswordMatch) {
          throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
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
          token.role = dbUser.role;
          token.kakaoId = kakaoId;
        } else {
          token.id = user.id;
          token.role = user.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.kakaoId = token.kakaoId
          ? String(token.kakaoId)
          : undefined;
        session.user.role = token.role;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
