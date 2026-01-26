"use client";

import { registerUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError("");
    setIsLoading(true);

    try {
      const result = await registerUser(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        router.push("/login");
      }
    } catch (err) {
      setError("회원가입 중 예상치 못한 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex  justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <section className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">회원가입</h1>
          <p className="mt-2 text-sm text-gray-600">
            굴비숍의 회원이 되어 다양한 혜택을 누려보세요!
          </p>
        </div>

        <form action={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              name="name"
              type="text"
              placeholder="홍길동"
              className="w-full border border-gray-300 rounded-md h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일 주소
            </label>
            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              className="w-full border border-gray-300 rounded-md h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
              minLength={6}
            />
            <p className="mt-1 text-xs text-gray-500">
              최소 6자 이상 입력해주세요.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gray-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 mt-2"
          >
            {isLoading ? "처리 중..." : "가입하기"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 w-full text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="text-gray-600 font-bold hover:underline ml-1"
            >
              로그인하기
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
