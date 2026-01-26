"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const bannerItems = [
  { text: "🚚 5만원 이상 구매 시 전지역 무료배송", link: "/events" },
  { text: "🎁 신규 회원가입 시 5% 할인 쿠폰 즉시 증정", link: "/login" },
];

export default function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex bg-[#1a1a1a] text-white overflow-hidden lg:h-12  items-center">
      <div className="max-w-7xl mx-auto w-full px-4 relative">
        <div className="flex justify-center items-center text-[12px] md:text-sm font-medium">
          {bannerItems.map((item, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-in-out transform ${
                index === currentIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href={item.link}
                className="hover:underline flex items-center gap-2"
              >
                {item.text}
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  View
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
