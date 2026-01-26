import Image from "next/image";
import Link from "next/link";

// 💡 브랜드 소개 페이지: 히어로 → 가치/스토리 → 공정 → CTA
export default function BrandPage() {
  const values = [
    {
      title: "정직한 재료",
      desc: "선별한 원물만 사용해 믿을 수 있는 맛을 만듭니다.",
    },
    {
      title: "정성 가공",
      desc: "손질부터 숙성까지 전 과정에서 사람의 손길을 담았습니다.",
    },
    {
      title: "신선 포장",
      desc: "저온 유통과 아이스팩 포장으로 맛과 향을 지킵니다.",
    },
  ];

  const processes = [
    {
      step: "01",
      title: "선별 · 손질",
      desc: "알맞게 건조된 굴비만 선별하고 깨끗하게 손질합니다.",
    },
    {
      step: "02",
      title: "숙성 · 건조",
      desc: "풍미를 높이는 전통 숙성법으로 촉촉한 식감을 유지합니다.",
    },
    {
      step: "03",
      title: "저온 포장",
      desc: "아이스팩 동봉, 산소 차단 포장으로 배송 중 신선도를 확보합니다.",
    },
    {
      step: "04",
      title: "안전 배송",
      desc: "빠른 출고와 냉장/냉동 체인을 유지해 안전하게 전달합니다.",
    },
  ];

  return (
    <main className="w-full mx-auto max-w-6xl px-4 lg:px-0 py-12 space-y-16">
      {/* 히어로 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1f2937] via-[#2c3a4a] to-[#0b1117] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/banners/main-3.jpg"
            alt="굴비 건조 이미지"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative px-6 md:px-12 py-12 md:py-16 max-w-3xl space-y-4">
          <p className="text-sm md:text-base text-white/80">브랜드 스토리</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            정성으로 말하는 굴비,
            <br />
            미다감의 맛을 만듭니다.
          </h1>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            바다의 풍미를 그대로 담기 위해, 좋은 재료와 정직한 공정에
            집중합니다. 더 쉽게, 더 맛있게 굴비를 즐길 수 있도록 연구합니다.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products"
              className="bg-white text-[#1f2937] px-4 md:px-5 py-2 rounded-full text-sm font-semibold shadow hover:-translate-y-0.5 transition-transform"
            >
              상품 보러가기
            </Link>
          </div>
        </div>
      </section>

      {/* 가치 */}
      <section aria-labelledby="brand-values" className="space-y-6">
        <div className="text-center space-y-2">
          <h2
            id="brand-values"
            className="text-2xl font-semibold text-[#3C2F21]"
          >
            우리가 지키는 가치
          </h2>
          <p className="text-sm text-gray-600">
            좋은 재료와 정직한 손길, 그리고 신선한 전달까지 전 과정에 정성을
            담았습니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow p-5 space-y-3"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {value.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 공정 소개 */}
      <section aria-labelledby="brand-process" className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2
              id="brand-process"
              className="text-2xl font-semibold text-[#3C2F21]"
            >
              미다감의 굴비가 만들어지기까지
            </h2>
            <p className="text-sm text-gray-600">
              선별부터 배송까지, 한 단계 한 단계 꼼꼼히 챙깁니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processes.map((process) => (
            <div
              key={process.step}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-[#3C2F21] text-white flex items-center justify-center text-sm font-semibold">
                {process.step}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {process.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {process.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-[#f8f5f2] border border-[#e6ded6] px-6 md:px-10 py-10 shadow-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-[#3C2F21]">
              신선한 굴비, 집까지 안전하게
            </h2>
            <p className="text-sm text-gray-700">
              오늘 주문하면 바로 준비해 출고합니다. 정성으로 만든 굴비를 가장
              맛있을 때 만나보세요.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/products"
              className="px-5 py-2 rounded-full bg-[#3C2F21] text-white text-sm font-semibold shadow hover:-translate-y-0.5 transition-transform"
            >
              상품 보러가기
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full border border-[#3C2F21] text-[#3C2F21] text-sm font-semibold hover:bg-[#3C2F21]/5 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
