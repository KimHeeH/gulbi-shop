import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOut, ShoppingBag, UserMinus, ChevronRight } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/my");
  }

  const user = session.user;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 lg:bg-white pb-20">
      {/* 1. 프로필 헤더 */}
      <div className="bg-white p-8 pt-12 border-b">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}님</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* 2. 쇼핑 메뉴 */}
      <div className="mt-4 bg-white border-y">
        <h3 className="px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
          쇼핑 정보
        </h3>

        <Link
          href="/orders"
          className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 border-t border-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gray-700" />
            <span className="font-medium text-gray-800">주문 내역</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </Link>
      </div>

      {/* 3. 계정 설정 */}
      <div className="mt-4 bg-white border-y">
        <h3 className="px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
          계정 관리
        </h3>

        {/* 로그아웃 버튼 (Client Component) */}
        <LogoutButton />

        <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 border-t border-gray-50 text-red-500">
          <div className="flex items-center gap-3">
            <UserMinus size={20} />
            <span className="font-medium">회원탈퇴</span>
          </div>
        </button>
      </div>

      <p className="text-center text-[11px] text-gray-300 mt-8">
        버전 정보 1.0.0 (Latest)
      </p>
    </div>
  );
}
