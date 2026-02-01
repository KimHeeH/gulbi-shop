"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import {
  Info,
  Package,
  MessageCircle,
  User,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { data: cartData } = useSWR(
    session ? "/api/cart/count" : null,
    fetcher
  );
  return (
    <header className="w-full px-6 lg:px-20 border-b">
      {/* 유저 메뉴 */}
      <nav className="py-3 ">
        <ul className="hidden lg:flex justify-end gap-x-6 text-secondary text-sm lg:text-base">
          <li className="text-[#4A4A4A] hover:text-[#222222] ">
            {session ? (
              <>
                <SignOutButton />
                <Link href="/my">마이페이지</Link>
              </>
            ) : (
              <Link href="/login">로그인 / 회원가입</Link>
            )}
          </li>
          {session && (
            <>
              {" "}
              <li className="text-[#4A4A4A] hover:text-[#222222]">
                <Link href="/orders">주문조회</Link>
              </li>
              <li className="text-[#4A4A4A] hover:text-[#222222] relative">
                <Link href="/cart">
                  <Image
                    src="/icons/shopping-cart.svg"
                    alt="Cart Icon"
                    width={28}
                    height={28}
                  />
                  <div className="absolute top-0 left-4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartData?.count || 0}
                  </div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 "
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out
    ${open ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {/* Header: 프로필 섹션 */}
        <div className="p-6 pt-12 bg-gray-50/50">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                <User size={24} className="text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {session ? `${session.user.name}님` : "로그인이 필요합니다"}
                </h2>
                <div className="text-xs text-gray-500 mt-1">
                  {session?.user?.email || <div>창근수산에 오신 것을 <br/>환영해요</div>}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {!session && (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block w-full py-3 bg-black text-white text-center rounded-xl font-bold text-sm shadow-lg active:scale-[0.98] transition-all"
            >
              로그인 / 회원가입
            </Link>
          )}
        </div>

        {/* Body: 메뉴 리스트 */}
        <nav className="p-4 flex flex-col h-[calc(100%-180px)] justify-between">
          <div className="space-y-1">
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">
              Shopping
            </p>

            <MenuLink
              href="/brand"
              icon={<Info size={20} />}
              label="브랜드 소개"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              href="/products"
              icon={<Package size={20} />}
              label="전체 상품"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              href="/contact"
              icon={<MessageCircle size={20} />}
              label="문의하기"
              onClick={() => setOpen(false)}
            />

            <div className="h-[1px] bg-gray-100 my-4 mx-4" />

            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">
              Account
            </p>
            <MenuLink
              href="/my"
              icon={<User size={20} />}
              label="마이페이지"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* 하단 로그아웃 */}
          {session && (
            <div className="px-4 pb-6">
              <SignOutButton />
            </div>
          )}
        </nav>
      </div>
      {/* 로고 */}
      <div className="flex justify-center py-0 ">
        <div className="w-40 h-10 lg:w-64 lg:h-28">
          {" "}
          <Link href="/">
            <Image
              src="/shoplogo.svg"
              alt="Gulbi Shop Logo"
              priority
              width={120}
              height={80}
              className="object-contain w-40 h-24 lg:w-64 lg:h-44"
            />
          </Link>
        </div>
      </div>

      {/* 메인 메뉴 */}
      <nav className="flex items-center justify-between h-14 relative">
        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
        >
          <Image
            src="/icons/menu.svg"
            alt="Menu Icon"
            width={28}
            height={28}
            className="w-4 h-4 text-black"
          />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-x-10 text-secondary font-medium text-lg">
          <li className="text-[#4A4A4A] hover:text-[#222222]">
            <Link href="/brand">브랜드 소개</Link>
          </li>
          <li className="text-[#4A4A4A] hover:text-[#222222]"  >
            <Link href="/products">전체 상품</Link>
          </li>
          <li className="text-[#4A4A4A] hover:text-[#222222]">
            <Link href="/contact">문의하기</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
    </header>
  );
}
function MenuLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all group"
    >
      <div className="flex items-center gap-4">
        <span className="text-gray-400 group-hover:text-black transition-colors">
          {icon}
        </span>
        <span className="font-semibold text-[15px]">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </Link>
  );
}
