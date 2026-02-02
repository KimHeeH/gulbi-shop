"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      key: "orders",
      label: "주문 관리",
      href: "/admin/orders",
      icon: "/icons/shopping-bag.svg",
    },
    {
      key: "register-products",
      label: "상품 등록",
      href: "/admin/products/register",
      icon: "/icons/product.svg",
    },
    {
      key: "products",
      label: "상품 목록",
      href: "/admin/products",
      icon: "/icons/product.svg",
    },
    {
      key: "pages",
      label: "홈페이지 바로가기",
      href: "/",
      icon: "/icons/product.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* 모바일 메뉴 Drawer */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* 배경 오버레이 */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* 메뉴 패널 */}
            <aside className="relative w-72 h-full bg-[#1f2937] text-white p-6 flex flex-col gap-8 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="font-bold text-xl tracking-tight">관리자 메뉴</span>
                {/* 직접 구현한 X 버튼 (SVG) */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 text-white/80 hover:text-white transition-colors"
                  aria-label="메뉴 닫기"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/10 transition-all active:scale-95"
                  >
                    <Image src={item.icon} alt={item.label} width={22} height={22} className="opacity-80" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* 모바일 상단 바 */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1f2937] text-white h-16 flex items-center justify-between px-5 shadow-lg">
          <span className="font-bold text-lg">Admin Panel</span>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 font-medium active:bg-white/20 transition-colors"
          >
            메뉴
          </button>
        </div>

        {/* 데스크톱 사이드바 */}
        <aside className="hidden md:flex w-64 bg-[#1f2937] text-white flex-col gap-8 py-8 px-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Image src="/icons/Profile.svg" alt="프로필" width={40} height={40} />
            <div className="text-lg font-semibold">관리자님</div>
          </div>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link key={item.key} href={item.href} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 transition-colors">
                <Image src={item.icon} alt={item.label} width={20} height={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-10 overflow-auto pt-20 md:pt-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">대시보드</h1>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                실시간 데이터와 핵심 관리 도구입니다.
              </p>
            </div>

            {/* 모바일에서 50/50 너비를 차지하는 버튼 영역 */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Link
                href="/admin/orders"
                className="flex-1 lg:flex-none px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all text-center shadow-md active:scale-95"
              >
                주문 확인
              </Link>
              <Link
                href="/admin/products/register"
                className="flex-1 lg:flex-none px-6 py-3 border-2 border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-50 transition-all text-center shadow-sm active:scale-95"
              >
                상품 등록
              </Link>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">빠른 작업</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link href="/admin/orders" className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-5 hover:border-gray-900 hover:shadow-xl transition-all group">
                <div>
                  <div className="font-bold text-gray-900 text-lg">주문 목록 보기</div>
                  <div className="text-sm text-gray-500 mt-1">최근 주문 건을 승인하거나 관리합니다.</div>
                </div>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/admin/products/register" className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-5 hover:border-gray-900 hover:shadow-xl transition-all group">
                <div>
                  <div className="font-bold text-gray-900 text-lg">새 상품 등록</div>
                  <div className="text-sm text-gray-500 mt-1">새로운 굴비 상품을 시장에 선보이세요.</div>
                </div>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}