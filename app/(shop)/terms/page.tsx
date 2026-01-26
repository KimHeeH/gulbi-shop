import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const mallName = "창근수산";
  const effectiveDate = "2026년 01월 26일";

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-white pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white border-b z-10 px-4 py-4 flex items-center gap-4">
        <Link href="/my" className="p-1">
          <ChevronLeft size={24} className="text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">이용약관</h1>
      </header>

      <main className="p-6 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-black mb-4">서비스 이용약관</h2>
        <p className="mb-6 text-gray-500">
          본 약관은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의
          규제에 관한 법률」, 「식품위생법」 등 관계 법령을 준수합니다.
        </p>

        <div className="space-y-8">
          {/* 제1조 ~ 제2조 */}
          <section>
            <h3 className="font-bold text-black mb-2">제1조 (목적)</h3>
            <p>
              이 약관은 {mallName}(이하 “몰”)이 운영하는 온라인 쇼핑몰에서 굴비
              및 수산물(이하 “재화”)을 판매함에 있어 몰과 이용자 간의 권리·의무
              및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-black mb-2">제2조 (정의)</h3>
            <p>
              1. “몰”이란 {mallName}이 재화를 이용자에게 제공하기 위하여
              정보통신설비를 이용하여 설정한 가상의 영업장을 말합니다.
            </p>
            <p>
              2. “이용자”란 몰에 접속하여 이 약관에 따라 몰이 제공하는 서비스를
              이용하는 회원 및 비회원을 말합니다.
            </p>
          </section>

          {/* 제3조 ~ 제7조 */}
          <section>
            <h3 className="font-bold text-black mb-2">
              제3조 (약관의 명시와 개정)
            </h3>
            <p>
              몰은 상호명, 대표자, 주소, 연락처 등을 이용자가 알 수 있도록 초기
              화면에 게시합니다. 관련 법령을 위배하지 않는 범위에서 약관을
              개정할 수 있으며, 개정 시 적용 7일 전부터 공지합니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-black mb-2">제4조 (서비스의 제공)</h3>
            <p>
              몰은 재화에 대한 정보 제공, 구매계약 체결 및 배송 업무를
              수행합니다. 재화의 품절 등 사유 발생 시 내용을 변경할 수 있으며
              사유를 공지합니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-black mb-2">제5조 (회원가입)</h3>
            <p>
              이용자는 가입 양식에 따라 정보를 기입하고 약관에 동의함으로써
              가입을 신청합니다. 허위 정보 기재 시 승낙되지 않을 수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-black mb-2">
              제6조 (구매계약의 성립)
            </h3>
            <p>
              이용자의 구매신청에 대하여 몰이 승낙의 의사표시를 한 때 계약이
              성립합니다. 가격, 수량, 배송비 등 중요 정보를 결제 전 제공합니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-black mb-2">제7조 (결제방법)</h3>
            <p>
              대금지급은 신용카드 결제, 계좌이체, 기타 전자적 지급수단 등 몰이
              제공하는 방식으로 할 수 있습니다.
            </p>
          </section>

          {/* 제8조 ~ 제9조 수산물 특화 */}
          <section>
            <h3 className="font-bold text-black mb-2">제8조 (배송)</h3>
            <p>
              배송은 결제 완료 후 영업일 기준 [3~5일] 이내에 이루어집니다. 단,
              수산물의 특성상 지연될 수 있습니다.
            </p>
          </section>

          <section className="border-t border-b py-4 border-gray-100">
            <h3 className="font-bold text-red-600 mb-2">
              제9조 (청약철회 및 교환·환불)
            </h3>
            <p className="mb-2 font-bold underline text-red-600">
              수산물은 신선식품으로 아래의 경우 환불이 제한됩니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>신선식품의 특성상 재판매가 곤란한 경우</li>
              <li>이용자의 책임 있는 사유로 상품이 훼손되거나 변질된 경우</li>
              <li>포장을 개봉하여 상품 가치가 현저히 감소한 경우</li>
            </ul>
            <p className="mt-2 font-medium italic text-blue-600">
              * 재화의 하자나 오배송의 경우에는 법령에 따라 교환/환불
              처리됩니다.
            </p>
          </section>

          {/* 나머지 조항들 */}
          <section>
            <h3 className="font-bold text-black mb-2">제10조 ~ 제13조</h3>
            <p className="mb-1">
              몰은 법령과 약관이 금지하는 행위를 하지 않으며 안정적 서비스
              제공에 최선을 다합니다.
            </p>
            <p className="mb-1">
              이용자는 허위 정보 등록 등 몰의 운영을 방해해서는 안 됩니다.
            </p>
            <p>분쟁 발생 시 몰의 본점 소재지 관할 법원에서 해결합니다.</p>
          </section>
        </div>

        {/* 부칙 */}
        <div className="mt-12 pt-6 border-t border-gray-100">
          <p className="font-bold text-black">부칙</p>
          <p className="mt-1 text-gray-500 italic">
            본 약관은 {effectiveDate}부터 시행합니다.
          </p>
        </div>
      </main>
    </div>
  );
}
