import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-white pb-20">
      {/* 상단 헤더 */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-10 px-4 py-4 flex items-center gap-4">
        <Link
          href="/my"
          className="hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">개인정보 처리방침</h1>
      </header>

      <main className="p-6 text-sm text-gray-600 leading-relaxed">
        <section className="mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-4">
            개인정보 처리방침
          </h2>
          <p className="text-xs text-gray-400 mb-6">시행일자: {currentDate}</p>

          <div className="space-y-8">
            {/* 1. 수집 항목 - 통합 버전 */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 underline">
                1. 수집하는 개인정보 항목
              </h3>
              <p className="mb-2 text-gray-600">
                창근수산은 회원가입의 방식에 따라 아래와 같은 개인정보를
                수집하고 있습니다.
              </p>

              <div className="space-y-4">
                {/* 일반 이메일 가입 */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                    일반 이메일 회원가입
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>
                      <strong>필수항목:</strong> 이메일 주소, 비밀번호(암호화
                      저장), 성명
                    </li>
                  </ul>
                </div>

                {/* 소셜 가입 */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                    간편 로그인 (카카오)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>
                      <strong>필수항목:</strong> 카카오 계정 고유 식별자(ID),
                      이메일
                    </li>
                  </ul>
                </div>

                {/* 주문 시 추가 정보 */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                    주문 및 배송 시 (공통)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>
                      <strong>수집항목:</strong> 수령인 이름, 배송지 주소,
                      휴대전화번호, 결제 정보
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. 수집 목적 */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 underline">
                2. 개인정보의 수집 및 이용목적
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                </li>
                <li>물품배송 또는 청구지 등 발송</li>
                <li>회원제 서비스 이용에 따른 본인확인, 개인 식별</li>
              </ul>
            </div>

            {/* 3. 제3자 제공 - 중요! */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 underline">
                3. 개인정보의 제3자 제공
              </h3>
              <p className="mb-2">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않으나,
                원활한 서비스 제공을 위해 아래와 같이 위탁하고 있습니다.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse border border-gray-200 mt-2">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 p-2">
                        제공받는 자
                      </th>
                      <th className="border border-gray-200 p-2">목적</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 p-2 text-center">
                        로젠택배(배송업체)
                      </td>
                      <td className="border border-gray-200 p-2">
                        상품 배송 및 위치 확인
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-2 text-center">
                        포트원 (PortOne)
                      </td>
                      <td className="border border-gray-200 p-2">
                        결제 처리 및 본인 인증
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. 보유 및 이용기간 */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 underline">
                4. 개인정보의 보유 및 이용기간
              </h3>
              <p>
                원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를
                지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가
                있는 경우 아래와 같이 보관합니다.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
              </ul>
            </div>

            {/* 5. 정보주체의 권리 */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 underline">
                5. 이용자의 권리와 그 행사방법
              </h3>
              <p>
                이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나
                수정할 수 있으며 가입해지(회원탈퇴)를 요청할 수도 있습니다.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-500">
          개인정보 보호책임자: 김창근
          <br />
          연락처: 010-3012-8435
        </div>
      </main>
    </div>
  );
}
