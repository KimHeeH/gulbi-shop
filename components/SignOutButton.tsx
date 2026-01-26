// components/SignOutButton.tsx (예시 파일 경로)
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    // 1. NextAuth.js의 signOut 함수 호출
    await signOut({
      // 2. 로그아웃 후 리디렉션될 경로 지정
      //    (여기서는 메인 페이지로 이동하도록 설정)
      redirect: false, // NextAuth의 기본 리디렉션을 막고 수동으로 제어
      callbackUrl: "/",
    });

    // 3. 수동 리디렉션 (옵션)
    router.push("/");
  };

  return (
    <button onClick={handleSignOut} className="mr-6">
      로그아웃
    </button>
  );
}
