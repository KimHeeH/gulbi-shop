// app/(admin)/layout.tsx 수정

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 💡 세션이 없거나, 사용자 정보가 없거나, 사용자의 역할(role)이 ADMIN이 아니면 접근 차단
  if (
    !session ||
    !session.user ||
    (session.user as { role?: string }).role !== "Admin"
  ) {
    redirect("/"); // 메인 페이지나 접근 거부 페이지로 리디렉션
  }

  return (
    <div className="admin-container">
      <aside>{/* 관리자 사이드바 */}</aside>
      <main>{children}</main>
    </div>
  );
}
