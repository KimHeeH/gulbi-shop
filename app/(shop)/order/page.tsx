import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchGetCartItem } from "@/lib/data"; // 장바구니 데이터를 가져오는 함수
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";
import Script from "next/script";
export default async function OrderPage() {
  // 1. 서버 세션 확인 (로그인 여부)
  const session = await getServerSession(authOptions);

  // 2. 로그인 안되어 있으면 로그인 페이지로 리다이렉트
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  // 3. 사용자의 장바구니 아이템 가져오기
  const cartItems = await fetchGetCartItem(session.user.id);

  // 4. 장바구니가 비어있으면 결제할 수 없으므로 장바구니로 보냄
  if (!cartItems || cartItems.length === 0) {
    redirect("/cart");
  }

  // 5. 서버에서 금액 계산 (클라이언트보다 서버 계산이 안전함)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingFee = 3500; // 배송비 설정
  const totalPrice = subtotal + shippingFee;

  return (
    <>
      {" "}
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        strategy="afterInteractive"
      />
      <div className="max-w-5xl mx-auto px-4 py-5 lg:py-16">
        <h1 className="text-3xl font-bold mb-10 text-gray-900 border-b pb-6">
          주문서 작성
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* 왼쪽: 배송 정보 입력 폼 (Client Component) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-2xl border sticky top-24">
              <h2 className="text-lg font-bold mb-4">주문 상품 정보</h2>

              {/* 상품 리스트 요약 */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-16 h-16 bg-white border rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.product.imageUrl || "/img/no_img.png"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-gray-500">
                        {item.quantity}개 /{" "}
                        {(item.product.price * item.quantity).toLocaleString()}
                        원
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 최종 금액 정보 */}
              <div className="space-y-2 border-t pt-4 text-gray-600">
                <div className="flex justify-between">
                  <span>상품금액</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>{shippingFee.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold text-[#3C2F21] pt-2">
                  <span>총 결제금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 mt-4 leading-tight">
                주문 내용을 확인하였으며, 정보 제공 및 결제에 동의합니다.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            {/* 검증된 유저 정보와 데이터를 자식에게 전달 */}

            <CheckoutForm
              user={session.user}
              totalPrice={totalPrice}
              cartItems={cartItems}
            />
          </div>

          {/* 오른쪽: 주문 상품 요약 (리뷰용) */}
        </div>
      </div>
    </>
  );
}
