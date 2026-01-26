import { fetchOrderItem, OrderWithItems } from "@/lib/data";
import BackButton from "@/components/BackButton";
export default async function MyOrderPage() {
  const orders: OrderWithItems[] = await fetchOrderItem();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-gray-300 mb-4 text-6xl">📦</div>
        <h1 className="text-2xl font-bold text-gray-800">
          현재 접수된 주문이 없습니다.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen bg-gray-50/30">
      <header className="flex justify-between items-end mb-10 border-b-2 border-gray-100 pb-8">
        <div>
          <BackButton />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            주문 관리 시스템
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            전체 주문 및 결제 현황을 관리합니다.
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
            총 {orders.length}건
          </span>
        </div>
      </header>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* 1. 상단 헤더 (주문번호/일시) */}
            <div className="bg-gray-50/80 px-6 py-4 flex justify-between items-center border-b">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded uppercase">
                  No.
                </span>
                <span className="font-mono text-sm font-bold text-gray-800">
                  {order.merchant_uid}
                </span>
              </div>
              <div className="text-sm text-gray-500 italic">
                {new Date(order.createdAt).toLocaleString("ko-KR")}
              </div>
            </div>

            {/* 2. 카드 본문 */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* 왼쪽: 구매자 및 상품 정보 */}
                <div className="space-y-6">
                  {/* 구매자 정보 */}
                  <div>
                    <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 text-left">
                      구매자 정보
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-black text-lg">
                        {order.buyerName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      배송지: {order.address}
                    </p>
                    <div className="text-gray-500 text-sm">
                      휴대폰 번호 : {order.buyerTel}
                    </div>
                  </div>

                  {/* ★ 상품 목록 정보 추가 ★ */}
                  <div>
                    <h3 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 text-left">
                      주문 상품 상세
                    </h3>
                    <div className="bg-orange-50/50 rounded-xl border border-orange-100 p-3 space-y-2">
                      {order.orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-700 font-medium">
                            {/* 상품 모델에 name 필드가 있다고 가정합니다. 없다면 item.productId 등으로 수정하세요. */}
                            {item.product.name || "상품명 정보 없음"}
                            {item.product.weight || "상품 무게 정보 없음"}
                          </span>
                          <span className="text-gray-500 text-sm font-bold">
                            {item.quantity}개
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 오른쪽: 결제 요약 */}
                <div className="flex flex-col justify-center items-end bg-slate-50 p-6 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded mb-4">
                    결제 완료
                  </span>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-tighter">
                      총 가격
                    </p>
                    <p className="text-3xl font-black text-black">
                      {order.totalPrice.toLocaleString()}
                      <span className="text-lg ml-1 font-bold text-gray-900">
                        원
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 하단 장식선 또는 버튼 */}
            <div className="h-1 bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}
