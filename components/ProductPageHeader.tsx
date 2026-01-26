"use client";

import { Home, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import BackButton from "./BackButton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPageHeader() {
  const { data: session } = useSession();

  // 로그인했을 때만 장바구니 개수 fetch
  const { data: cartData } = useSWR(
    session ? "/api/cart/count" : null,
    fetcher
  );

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white sticky top-0 z-50">
      <BackButton />
      <div className="flex gap-6">
        {/* 홈 아이콘 */}
        <Link href="/" className="text-gray-600 hover:text-black">
          <Home size={26} strokeWidth={2} />
        </Link>

        {/* 장바구니 아이콘 */}
        <Link href="/cart" className="relative text-gray-600 hover:text-black">
          <ShoppingCart size={26} strokeWidth={2} />
          {cartData?.count > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
              {cartData.count}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
