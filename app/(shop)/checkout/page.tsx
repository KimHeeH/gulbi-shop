import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchGetCartItem, fetchGetProductData } from "@/lib/data";
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";
import Script from "next/script";
import { CartItem } from "@/types/cart";

export default async function IntegratedCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; quantity?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  const params = await searchParams;
  const productId = params.id;
  const quantity = params.quantity ? parseInt(params.quantity) : 1;

  let checkoutItems: CartItem[] = [];

  // --- 1. 데이터 준비 (분기 처리) ---
  if (productId) {
    // [바로 구매하기] 로직
    const product = await fetchGetProductData(productId);
    if (!product) redirect("/products");

    checkoutItems = [
      {
        id: 0, // 임시 ID
        userId: session.user.id,
        productId: product.id,
        quantity: quantity,
        product: {
          ...product,
          description: product.description || "",
          imageUrl: product.imageUrl || "",
          origin: product.origin || "",
          weight: product.weight || "",
          shippingFee: product.shippingFee || 3500,
          shippingMethod: product.shippingMethod || "택배",
          minOrderQty: product.minOrderQty || 1,
        },
      },
    ];
  } else {
    // [장바구니 구매] 로직
    const cartItems = await fetchGetCartItem(session.user.id);
    if (!cartItems || cartItems.length === 0) {
      redirect("/cart");
    }
    checkoutItems = cartItems;
  }

  // --- 2. 공통 금액 계산 ---
  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  // 가장 비싼 배송비 하나만 적용하거나 합산 (여기선 3500원 고정 예시)
  const shippingFee = 3500;
  const totalPrice = subtotal + shippingFee;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        strategy="afterInteractive"
      />

      {/* 헤더 영역: 로고와 단계만 깔끔하게 */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            주문/결제
          </h1>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-400">장바구니</span>
            <span className="text-gray-300 text-xs">▶</span>
            <span className="text-blue-600">주문결제</span>
            <span className="text-gray-300 text-xs">▶</span>
            <span className="text-gray-400">완료</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 왼쪽: 입력 영역 (80% 비중) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. 주문 상품 요약 섹션 */}
            <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-5 border-b bg-gray-50/50">
                <h2 className="font-bold text-lg text-gray-800">
                  주문 상품 ({checkoutItems.length})
                </h2>
              </div>
              <div className="divide-y">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id || item.productId}
                    className="p-5 flex gap-4"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative border flex-shrink-0">
                      <Image
                        src={item.product.imageUrl || "/img/no_img.png"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-gray-500 mb-1">
                        {item.product.origin || "국내산"}
                      </p>
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.quantity}개 /{" "}
                        <span className="font-bold">
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                          원
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. 결제 폼 (배송지 입력 등) */}
            <section className="bg-white rounded-xl shadow-sm border">
              <div className="p-5 border-b bg-gray-50/50">
                <h2 className="font-bold text-lg text-gray-800">배송 정보</h2>
              </div>
              <div className="p-6">
                <CheckoutForm
                  user={session.user}
                  totalPrice={totalPrice}
                  cartItems={checkoutItems}
                />
              </div>
            </section>
          </div>

          {/* 오른쪽: 결제 요약 (Sticky 적용) */}
          <aside className="lg:col-span-4 sticky top-24">
            <section className="bg-white rounded-xl shadow-md border overflow-hidden">
              <div className="p-5 border-b">
                <h2 className="font-bold text-lg text-gray-800">결제 금액</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>총 상품금액</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>배송비</span>
                  <span className="font-medium">
                    +{shippingFee.toLocaleString()}원
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-4">
                  <span className="font-bold text-gray-900 text-lg">
                    최종 결제금액
                  </span>
                  <span className="text-2xl font-black text-black-600">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </section>

            <p className="mt-4 text-[11px] text-gray-400 text-center leading-normal px-4">
              주문 내용을 모두 확인하였으며, 정보 제공 및 결제 진행에
              동의합니다. 결제 시 사용하시는 카드의 보안 정보를 확인하시기
              바랍니다.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}
