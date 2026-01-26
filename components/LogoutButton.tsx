"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
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
    <button
      onClick={handleSignOut}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 border-t border-gray-50 text-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <LogOut size={20} className="text-gray-500" />
        <span className="font-medium">로그아웃</span>
      </div>
    </button>
  );
}
