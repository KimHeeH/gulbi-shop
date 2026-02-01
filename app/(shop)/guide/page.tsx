import {
  ChevronLeft,
  Truck,
  CreditCard,
  Anchor,
  AlertCircle,
  Camera,
} from "lucide-react";
import Link from "next/link";

export default function FisheryGuidePage() {
  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white border-b z-10 px-4 py-4 flex items-center gap-4">
        <Link href="/my" className="hover:bg-gray-100 p-1 rounded-full">
          <ChevronLeft size={24} className="text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold">수산물 이용안내</h1>
      </header>

      <main className="p-4 space-y-4">
        {/* 2. 배송 및 보관 (신선도 유지) */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Truck size={20} />
            <h2 className="font-bold text-gray-900">배송 및 신선도 관리</h2>
          </div>
          <ul className="text-sm text-gray-600 space-y-3">
            <li>
              • 신선도 유지를 위해 아이스박스+아이스팩 포장으로 배송됩니다.
            </li>
            <li>
              • 수령 즉시 내용물을 확인하시고, 바로 드시지 않을 경우 **[냉동]**
              보관해 주세요.
            </li>
            <li>
              • 여름철에는 배송 과정에서 아이스팩이 다소 녹을 수 있으나, 상품의
              냉기만 남아있다면 품질에는 문제가 없습니다.
            </li>
          </ul>
        </section>

        {/* 3. 취소/환불 불가 규정 (가장 중요) */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
          <div className="flex items-center gap-2 mb-4 text-red-600">
            <AlertCircle size={20} />
            <h2 className="font-bold text-gray-900">취소 및 환불 제한 안내</h2>
          </div>
          <div className="p-4 rounded-xl mb-4 text-xs text-red-600 leading-relaxed">
            <strong>
              ※ 수산물은 전자상거래법 제17조 제2항에 따른 신선식품으로, 단순
              변심에 의한 반품 및 교환이 법적으로 제한됩니다.
            </strong>
          </div>
          <ul className="text-sm text-gray-600 space-y-3">
            <li className="font-bold">
              • 개인적인 입맛 차이, 크기/모양의 불일치 등으로 인한 환불은
              불가합니다.
            </li>
            <li>
              • 주소 불분명, 연락 두절로 인한 미수령 및 방치로 발생한 변질은
              책임지지 않습니다.
            </li>
          </ul>
        </section>

        {/* 4. 문제 발생 시 대처법 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-orange-600">
            <Camera size={20} />
            <h2 className="font-bold text-gray-900">상품에 문제가 있는 경우</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            상품이 변질되거나 파손되어 도착했다면, 버리지 마시고 아래로 연락
            주세요.
          </p>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal pl-4">
            <li>
              사이트에 기재된 연락처처로 사진과 함께 주문자명을 남겨주시면
              빠르게 처리해 드립니다.
            </li>
          </ol>
        </section>
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
      </main>

      <div className="p-8 text-center text-xs text-gray-400">감사합니다.</div>
    </div>
  );
}
