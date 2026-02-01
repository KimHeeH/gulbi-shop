"use client";
export const dynamic = "force-dynamic";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
interface HomeClientProps {
  products: Product[];
  error: string | null;
}

const bannerItems = [
  {
    id: "heritage",
    title: "정성과 사랑이 가득 담긴",
    subtitle: "명품 굴비 전문점",
    description:
      "가족이 먹는다는 마음으로 최상의 굴비만 준비했습니다. 풍미를 살린 정직한 굴비를 만나보세요.",
    imageSrc: "/banners/main-3.jpg",
  },
  {
    id: "microwave",
    title: "전자레인지로 간편하게!",
    subtitle: "2분 땡 찐보리굴비",
    description:
      "비린내 없이 촉촉함 그대로, 간편 조리로 집에서도 맛있게 즐겨보세요.",
    imageSrc: "/banners/main-4.png",
  },
];

const categoryFilters = [
  { key: "gift", label: "선물용 굴비" },
  { key: "home", label: "가정용 굴비" },
  { key: "barley", label: "보리 굴비" },
  { key: "fermented", label: "홍어 · 시제 음식" },
];

export default function HomeClient({ products, error }: HomeClientProps) {
  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  const displayedProducts = products.slice(0, 3);

  return (
    <main className="w-full mx-auto max-w-7xl px-4 lg:px-0">
      {/* ... (메인 배너 섹션 - Swiper 로직은 그대로 유지) ... */}
      <section aria-label="메인 배너" className="pt-10">
        <div className="relative group">
          <Swiper
            modules={[Autoplay, Navigation, EffectFade]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            effect="fade"
            loop
            slidesPerView={1}
            className="relative main-banner-swiper"
          >
            {bannerItems.map((bannerItem) => (
              <SwiperSlide key={bannerItem.id}>
                <div className="relative min-h-[300px] md:min-h-[500px] w-full overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={bannerItem.imageSrc}
                    alt={bannerItem.subtitle}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/35 to-black/0" />
                  <div className="absolute inset-0 flex items-center px-6 md:px-14">
                    <div className="max-w-xl text-white space-y-3 md:space-y-4">
                      <p className="text-sm md:text-base font-medium">
                        {bannerItem.title}
                      </p>
                      <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
                        {bannerItem.subtitle}
                      </h2>
                      <p className="text-sm md:text-base text-gray-100">
                        {bannerItem.description}
                      </p>
                      <div className="flex gap-3">
                        <Link
                          href="/products"
                          className="bg-white text-black px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow hover:-translate-y-0.5 transition-transform"
                        >
                          상품 보러가기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section
        aria-labelledby="section-featured"
        className="mt-12 mb-20 space-y-6"
      >
        <div className="flex flex-col items-center gap-2">
          <h2
            id="section-featured"
            className="text-center text-2xl font-semibold text-[#3C2F21]"
          >
            인기상품
          </h2>
        </div>

        <nav
          aria-label="상품 카테고리"
          className="flex flex-wrap justify-center gap-3"
        >
          {categoryFilters.map((category) => (
            <button
              key={category.key}
              className="text-xs px-2 lg:px-4 py-2 border border-gray-200 rounded-full lg:text-sm font-medium text-gray-700 hover:bg-[#F5F5F5] hover:border-gray-300 transition-colors"
              type="button"
            >
              {category.label}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              현재 등록된 상품이 없습니다.
            </div>
          ) : (
            // DB에서 가져온 상품을 렌더링
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
      {/* ✅ Footer / 하단 정보 영역 */}
      <footer
        aria-label="하단 정보"
        className="hidden lg:block border-t border-gray-100 pt-10 pb-14"
      >
        <div className="flex flex-col gap-8">
          {/* 링크 영역 */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-700">
            <Link href="/brand" className="hover:underline">
              회사소개
            </Link>
            <Link href="/terms" className="hover:underline">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:underline">
              개인정보처리방침
            </Link>
            <Link href="/guide" className="hover:underline">
              이용안내
            </Link>
          </div>

          {/* 사업자 정보(필수 표시 영역) */}
          <div className="mx-auto max-w-3xl text-center text-xs leading-6 text-gray-500">
            <p className="font-medium text-gray-600">
              상호명 :창근수산 | 대표: 강보금
            </p>
            <p>
              사업자등록번호: [000-00-00000] | 통신판매업신고:
              [제0000-지역-0000호]
            </p>
            <p>
              주소: 전라남도 영광군 영광읍 신남로3길 15-8 | 고객센터:
              010-3012-8435 | 이메일: cgair1@naver.com
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} 창근수산. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
