import { fetchMyOrderItem } from "@/lib/data";
import { Package, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeliveryModal from "@/components/DeliveryModal";
import OrderActionButtons from "@/components/OrderActionButton";
export default async function OrderHistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id && !session?.user?.kakaoId) {
    // 세션에 id가 있는지 확인 (kakaoId 등)
    redirect("/login");
  }

  const orders = await fetchMyOrderItem(session.user.id);
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      {/* 헤더 */}
      <header className="bg-white px-5 py-4 border-b flex items-center gap-4 sticky top-0 z-10">
        <Link href="/my" className="p-1">
          <ChevronRight className="rotate-180 text-gray-600" size={24} />
        </Link>
        <h1 className="text-lg font-bold">주문 내역</h1>
      </header>

      {/* 주문 목록 */}
      <main className="p-4 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4"
          >
            {/* 카드 상단: 날짜 및 주문번호 */}
            <div className="px-5 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Clock size={14} />
                {/* Date 객체 문자열 변환 처리 */}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {order.merchant_uid}
              </span>
            </div>

            {/* ⭐ 내부 map: 주문에 속한 모든 상품 출력 */}
            <div className="divide-y divide-gray-50">
              {order.orderItems.map((item) => (
                <div key={item.id} className="p-5 flex gap-4">
                  {/* 상품 이미지 */}
                  <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.product.imageUrl || "/shoplogo (7).png"}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* 상품 정보 */}
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-blue-500 mb-0.5">
                      {order.status === "PAID" ? "결제완료" : "주문완료"}
                    </span>
                    <h3 className="text-sm font-bold text-gray-800 truncate">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-900 font-bold">
                        {item.product.price.toLocaleString()}원
                      </p>
                      <p className="text-xs text-gray-500">{item.quantity}개</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 카드 하단: 총 결제 금액 및 버튼 */}
            <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">
                  총 결제금액
                </span>
                <span className="text-lg font-black text-gray-900">
                  {order.totalPrice.toLocaleString()}원
                </span>
              </div>
              <div className="flex gap-2">
                <OrderActionButtons />
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
