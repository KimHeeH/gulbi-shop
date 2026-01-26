"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
// 아이콘 라이브러리 임포트
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data: cartData } = useSWR(
    session ? "/api/cart/count" : null,
    fetcher
  );

  const isActive = (path: string) => pathname === path;

  // 공통 아이콘 스타일
  const iconStyle = (path: string) =>
    isActive(path) ? "text-black" : "text-gray-400";

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <ul className="flex justify-around items-center h-16">
        <li>
          <Link href="/" className="flex flex-col items-center gap-1">
            <Home size={24} className={iconStyle("/")} />
            <span
              className={`text-[10px] ${
                isActive("/") ? "text-black font-bold" : "text-gray-400"
              }`}
            >
              홈
            </span>
          </Link>
        </li>

        <li>
          <Link href="/products" className="flex flex-col items-center gap-1">
            <LayoutGrid size={24} className={iconStyle("/products")} />
            <span
              className={`text-[10px] ${
                isActive("/products") ? "text-black font-bold" : "text-gray-400"
              }`}
            >
              전체상품
            </span>
          </Link>
        </li>

        <li>
          <Link
            href="/cart"
            className="flex flex-col items-center gap-1 relative"
          >
            <ShoppingCart size={24} className={iconStyle("/cart")} />
            {cartData?.count > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                {cartData.count}
              </span>
            )}
            <span
              className={`text-[10px] ${
                isActive("/cart") ? "text-black font-bold" : "text-gray-400"
              }`}
            >
              장바구니
            </span>
          </Link>
        </li>

        <li>
          <Link
            href={session ? "/my" : "/login"}
            className="flex flex-col items-center gap-1"
          >
            <User
              size={24}
              className={
                isActive("/mypage") || isActive("/login")
                  ? "text-black"
                  : "text-gray-400"
              }
            />
            <span
              className={`text-[10px] ${
                isActive("/mypage") || isActive("/login")
                  ? "text-black font-bold"
                  : "text-gray-400"
              }`}
            >
              {session ? "마이페이지" : "로그인"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
