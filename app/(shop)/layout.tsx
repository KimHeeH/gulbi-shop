// app/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "미다감 굴비",
  description: "미다감 굴비 쇼핑몰",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) {
    console.error("ShopLayout: children이 전달되지 않았습니다.");
    return null;
  }

  return (
    <div className="shop-layout flex flex-col min-h-screen">
      <TopBanner />
      <Header />
      <BottomNav />

      <main className="">{children}</main>

      {/* 모바일 전용 하단 네비게이션 */}
    </div>
  );
}
