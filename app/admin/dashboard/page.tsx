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
      label: "홈페이지 바로가기기",
      href: "/",
      icon: "/icons/product.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="flex h-screen">
{/* 모바일 메뉴 Drawer */}
{isMenuOpen && (
  <div className="fixed inset-0 z-50 md:hidden">
    {/* 배경 오버레이 */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setIsMenuOpen(false)}
    />

    {/* 메뉴 패널 */}
    <aside className="relative w-64 h-full bg-[#1f2937] text-white p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">관리자 메뉴</span>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-white/70"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10"
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={20}
              height={20}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  </div>
)}

<div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1f2937] text-white h-14 flex items-center justify-between px-4 shadow">
  <span className="font-semibold">관리자 대시보드</span>
  <button
  onClick={() => setIsMenuOpen(true)}
  className="text-sm px-3 py-1 rounded bg-white/10"
>
  메뉴
</button>

</div>

        <aside className="hidden md:flex w-64 bg-[#1f2937] text-white flex-col gap-8 py-8 px-6 shadow-lg">
        <div className="flex items-center gap-3">
            <Image
              src="/icons/Profile.svg"
              alt="프로필 아이콘"
              width={40}
              height={40}
            />
            <div className="text-lg font-semibold">관리자님</div>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Image
                  src={item.icon}
                  alt={`${item.label} 아이콘`}
                  width={20}
                  height={20}
                />
                <span className="text-base">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-10 overflow-auto pt-16 md:pt-10">
        <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                관리자 대시보드
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                핵심 지표와 주요 작업을 한눈에 확인하세요.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/(admin)/orders"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
              >
                새 주문 확인
              </Link>
              <Link
                href="/products"
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 hover:bg-gray-100 transition-colors"
              >
                상품 등록
              </Link>
            </div>
          </div>

          {/* 카드형 정보 영역 - 더미 값, 실제 데이터로 교체 가능 */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {[
              { title: "오늘 주문", value: "24건", desc: "전일 대비 +8건" },
              { title: "주문 처리 대기", value: "7건", desc: "출고 처리 필요" },
              { title: "재고 부족 상품", value: "3개", desc: "입고 알림 확인" },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-sm text-gray-500 mb-2">{card.title}</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {card.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{card.desc}</div>
              </div>
            ))}
          </section>

          {/* 작업 바로가기 */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              빠른 작업
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/orders"
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    주문 목록 보기
                  </div>
                  <div className="text-sm text-gray-600">
                    최근 주문을 확인하고 처리하세요.
                  </div>
                </div>
                <span className="text-sm text-gray-500">→</span>
              </Link>
              <Link
                href="/admin/register/products"
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    상품 등록/수정
                  </div>
                  <div className="text-sm text-gray-600">
                    신규 상품 추가 또는 재고 업데이트.
                  </div>
                </div>
                <span className="text-sm text-gray-500">→</span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

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
      label: "홈페이지 바로가기기",
      href: "/",
      icon: "/icons/product.svg",
    },
  ];


