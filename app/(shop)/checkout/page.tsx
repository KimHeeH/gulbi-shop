import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchGetProductData } from "@/lib/data";
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";
import Script from "next/script";
import { CartItem } from "@/types/cart";

// 바로구매하기를 위한 체크아웃 페이지
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { id?: string; quantity?: string };
}) {
  // 1. 서버 세션 확인 (로그인 여부)
  const session = await getServerSession(authOptions);

  // 2. 로그인 안되어 있으면 로그인 페이지로 리다이렉트
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  // 3. query parameter에서 상품 ID와 수량 가져오기
  const productId = searchParams.id;
  const quantity = searchParams.quantity ? parseInt(searchParams.quantity) : 1;

  // 4. 상품 ID가 없으면 에러 처리
  if (!productId || isNaN(Number(productId))) {
    redirect("/products");
  }

  // 5. 수량 검증
  if (isNaN(quantity) || quantity < 1 || quantity > 999) {
    redirect(`/products/${productId}`);
  }

  // 6. 상품 정보 가져오기
  const product = await fetchGetProductData(Number(productId));

  // 7. 상품이 존재하지 않으면 404
  if (!product) {
    redirect("/products");
  }

  // 8. CartItem 형태로 변환 (CheckoutForm이 기대하는 형태)
  const cartItem: CartItem = {
    id: 0, // 임시 ID (실제 장바구니에 담지 않으므로)
    userId: session.user.id,
    productId: product.id,
    quantity: quantity,
    product: {
      id: product.id,
      name: product.name,
      description: product.description || "",
      imageUrl: product.imageUrl || "",
      price: product.price,
      origin: product.origin || "",
      weight: product.weight || "",
      shippingFee: product.shippingFee || 3500,
      shippingMethod: product.shippingMethod || "택배",
      minOrderQty: product.minOrderQty || 1,
    },
  };

  // 9. 서버에서 금액 계산 (클라이언트보다 서버 계산이 안전함)
  const subtotal = product.price * quantity;
  const shippingFee = product.shippingFee || 3500; // 배송비 설정
  const totalPrice = subtotal + shippingFee;

  return (
    <>
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
          {/* 왼쪽: 주문 상품 정보 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-2xl border sticky top-24">
              <h2 className="text-lg font-bold mb-4">주문 상품 정보</h2>

              {/* 상품 정보 */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-3 text-sm">
                  <div className="w-16 h-16 bg-white border rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={product.imageUrl || "/img/no_img.png"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800 line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-gray-500">
                      {quantity}개 /{" "}
                      {(product.price * quantity).toLocaleString()}원
                    </p>
                  </div>
                </div>
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

          {/* 오른쪽: 배송 정보 입력 폼 */}
          <div className="lg:col-span-2">
            <CheckoutForm
              user={session.user}
              totalPrice={totalPrice}
              cartItems={[cartItem]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

