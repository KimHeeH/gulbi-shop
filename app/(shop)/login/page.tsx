"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function LoginPage() {
  const router = useRouter();
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const { data: session } = useSession();
  // 입력값 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. 일반 로그인 핸들러
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage("");
    setIsEmailLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // 에러 처리를 위해 false로 설정
      });

      if (result?.error) {
        // auth.ts에서 throw한 에러 메시지가 여기 담깁니다.
        setLoginErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        router.push("/"); // 성공 시 메인으로 이동
        router.refresh();
      }
    } catch (error) {
      setLoginErrorMessage("로그인 도중 오류가 발생했습니다.");
    } finally {
      setIsEmailLoading(false);
    }
  };

  // 2. 카카오 로그인 핸들러
  const handleKakaoLogin = async () => {
    setLoginErrorMessage("");
    setIsKakaoLoading(true);
    try {
      // 일단 메인으로 보냅니다.
      // 어드민 리다이렉트는 middleware.ts에서 처리하게 두는 것이 가장 안전합니다.
      await signIn("kakao", { callbackUrl: "/" });
    } catch {
      setLoginErrorMessage("일시적인 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsKakaoLoading(false);
    }
  };

  return (
    <main className="overflow-y-none flex items-center justify-center bg-gray-50">
      <section className="h-full bg-white p-10 rounded-xl sm:p-10 sm:rounded-2xl sm:shadow-xl flex flex-col items-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">로그인</h1>

        {/* 일반 로그인 폼 */}
        <form
          onSubmit={handleEmailLogin}
          className="w-full flex flex-col items-center"
        >
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md mb-3 w-full h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md mb-6 w-full h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={isEmailLoading}
            className="w-full h-12 bg-black text-white rounded-md font-bold hover:bg-gray-800 transition-colors mb-4 disabled:bg-gray-400"
          >
            {isEmailLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="flex items-center w-full mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">또는</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* 카카오 로그인 버튼 */}
        <button
          type="button"
          onClick={handleKakaoLogin}
          disabled={isKakaoLoading}
          className="disabled:opacity-60 disabled:cursor-not-allowed mb-6"
        >
          <Image
            src="/img/kakao_login_btn.png"
            alt="카카오 로그인 버튼"
            width={320}
            height={70}
            className="hover:scale-105 transition-all duration-300 cursor-pointer"
          />
        </button>

        {/* 에러 메시지 */}
        {loginErrorMessage && (
          <p className="mb-4 text-sm text-red-500 font-medium text-center">
            {loginErrorMessage}
          </p>
        )}

        {/* 회원가입 링크 */}
        <div className="text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <Link
            href="/register"
            className="text-gray-600 font-bold hover:underline"
          >
            회원가입하기
          </Link>
        </div>
      </section>
    </main>
  );
}
