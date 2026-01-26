"use client";

import { useState } from "react";
import { CartItem } from "@/types/cart";
import { ShippingInfo } from "@/types/order";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { createOrder } from "@/lib/actions";
import { Address } from "react-daum-postcode";
interface PaymentResponse {
  success: boolean;
  error_msg?: string;
  imp_uid?: string; // 포트원 고유 결제번호
  merchant_uid?: string; // 내 쇼핑몰 주문번호
  paid_amount?: number; // 실제 결제된 금액
  // 필요한 필드를 추가로 정의할 수 있습니다.
}
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IMP: any;
  }
}
interface CheckoutFormProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    kakaoId?: string;
    role: "User" | "Admin";
  };
  totalPrice: number;
  cartItems: CartItem[];
}

export default function CheckoutForm({
  user,
  totalPrice,
  cartItems,
}: CheckoutFormProps) {
  const [shippingData, setShippingData] = useState<ShippingInfo>({
    name: user.name || "",
    phone: "",
    zipcode: "",
    address: "",
    addressDetail: "",
    memo: "",
  });
  const open = useDaumPostcodePopup();
  // 3. 주소 선택 완료 핸들러 (에러 2304 해결)
  const handleAddressComplete = (data: Address) => {
    setShippingData((prev) => ({
      ...prev,
      zipcode: data.zonecode,
      address: data.address,
    }));
  };

  // 4. 결제 버튼 클릭 핸들러 (에러 2304 해결)
  const handlePayment = async () => {
    // 1. 필수 입력값 검증 (Validation)
    // 주소 검색 API로 받은 데이터와 상세주소, 연락처가 있는지 확인합니다.
    if (!shippingData.name || !shippingData.phone || !shippingData.address) {
      alert("배송 정보를 모두 입력해 주세요.");
      return;
    }

    // 2. 가맹점 식별코드 초기화
    const { IMP } = window;

    // 포트원 관리자 센터에서 확인한 내 식별코드를 입력하세요.
    const impCode = process.env.NEXT_PUBLIC_PORTONE_IMP_CODE;
    if (!impCode) {
      alert("결제 설정(식별코드)이 누락되었습니다.");
      return;
    }

    IMP.init(impCode);
    // 3. 주문번호 생성 (merchant_uid)
    // 주문번호는 매번 고유해야 결제창이 뜹니다. 보통 '날짜_랜덤숫자' 조합을 씁니다.
    const today = new Date();
    const merchant_uid = `ORD_${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}_${today.getTime()}`;

    // 4. 결제 데이터 구성
    const paymentData = {
      pg: "html5_inicis.INIpayTest", // PG사 선택 (KG이니시스)
      pay_method: "card", // 결제 수단 (카드, 가상계좌, 계좌이체 등)
      merchant_uid: merchant_uid, // 주문번호
      name:
        cartItems.length > 1
          ? `${cartItems[0].product.name} 외 ${cartItems.length - 1}건`
          : cartItems[0].product.name, // 결제창에 표시될 상품명
      amount: 100, // 총 결제 금액
      buyer_email: user.email || "",
      buyer_name: shippingData.name,
      buyer_tel: shippingData.phone,
      buyer_addr: `${shippingData.address} ${shippingData.addressDetail}`,
      buyer_postcode: shippingData.zipcode,
      // m_redirect_url: "https://내사이트.com/checkout/complete", // 모바일 결제 후 이동할 주소
    };

    // 5. 결제창 호출 및 결과 처리 (Callback)
    IMP.request_pay(paymentData, async (rsp: PaymentResponse) => {
      if (rsp.success) {
        if (
          !rsp.imp_uid ||
          !rsp.merchant_uid ||
          rsp.paid_amount === undefined
        ) {
          alert("결제 정보가 올바르지 않습니다.");
          return;
        }
        // [결제 성공 시]
        const result = await createOrder(
          {
            imp_uid: rsp.imp_uid || "",
            merchant_uid: rsp.merchant_uid || "",
            paid_amount: rsp.paid_amount || 0,
          },
          {
            userId: user.id,
            name: shippingData.name,
            phone: shippingData.phone,
            address: shippingData.address,
            addressDetail: shippingData.addressDetail,
          },
          cartItems
        );
        console.log("결제 성공 데이터:", rsp);

        try {
          window.location.href = `/order/success/${result.orderId}`;
          alert("결제가 완료되었습니다! 주문 내역으로 이동합니다.");

          // window.location.href = "/orders/success";
        } catch (error) {
          console.error("주문 저장 실패:", error);
          alert(
            "결제는 성공했으나 주문 정보 저장에 실패했습니다. 고객센터에 문의하세요."
          );
        }
      } else {
        // [결제 실패 시]
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
    });
  };
  return (
    <>
      {" "}
      <div className="space-y-6">
        <div className="bg-white p-8 border rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">배송지 정보</h2>

          <div className="space-y-5">
            {/* 수령인 & 연락처 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  수령인
                </label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={shippingData.name}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, name: e.target.value })
                  }
                  className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  연락처
                </label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={shippingData.phone}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, phone: e.target.value })
                  }
                  className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>

            {/* 주소 입력 섹션 */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                주소
              </label>

              {/* 우편번호 & 주소찾기 버튼 */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="우편번호"
                  value={shippingData.zipcode}
                  readOnly
                  className="w-32 border border-gray-200 p-4 rounded-2xl bg-gray-50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => open({ onComplete: handleAddressComplete })}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl transition-colors text-sm"
                >
                  주소 검색
                </button>
              </div>

              {/* 기본 주소 */}
              <input
                type="text"
                placeholder="주소 검색을 이용해 주세요"
                value={shippingData.address}
                readOnly
                className="w-full border border-gray-200 p-4 rounded-2xl bg-gray-50 outline-none"
              />

              {/* 상세 주소 */}
              <input
                type="text"
                placeholder="상세 주소를 입력하세요 (동, 호수 등)"
                value={shippingData.addressDetail}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    addressDetail: e.target.value,
                  })
                }
                className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>

            {/* 배송 메모 */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                배송 메모 (선택)
              </label>
              <input
                type="text"
                placeholder="배송 기사님께 전달할 메시지를 적어주세요"
                value={shippingData.memo}
                onChange={(e) =>
                  setShippingData({ ...shippingData, memo: e.target.value })
                }
                className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* 최종 결제 버튼 */}
        <div className="px-2">
          <button
            onClick={handlePayment}
            className="w-full bg-[#3C2F21] hover:bg-black text-white py-5 rounded-3xl font-bold text-xl shadow-xl transition-all active:scale-[0.98]"
          >
            {totalPrice.toLocaleString()}원 결제하기
          </button>
          <p className="text-center text-gray-400 text-xs mt-4">
            위 주문 내용을 확인하였으며 결제에 동의합니다.
          </p>
        </div>
      </div>
    </>
  );
}
