export const dynamic = "force-dynamic";

import { fetchOrderItem, OrderWithItems } from "@/lib/data";
import BackButton from "@/components/BackButton";

export default async function MyOrderPage() {
  const orders: OrderWithItems[] = await fetchOrderItem();

  if (!orders || orders.length === 0) {
    return (     <div className="p-10"> <BackButton />

      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center">
        <div className="text-gray-200 text-7xl mb-4">📄</div>
        <h1 className="text-xl font-medium text-gray-500">
          접수된 주문 내역이 없습니다.
        </h1>
      </div></div>  
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        {/* 헤더 섹션: 더 담백하게 */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <BackButton />
            <h1 className="text-4xl font-black tracking-tight">
              주문 내역 관리
            </h1>
          </div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-100">
            <span className="text-sm text-gray-500 mr-2">총 주문 건수</span>
            <span className="text-xl font-bold">{orders.length}</span>
          </div>
        </header>

        {/* 엑셀 스타일 테이블 */}
        <div className="overflow-x-auto border-t-2 border-black">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500 border-b">
                <th className="px-6 py-4 font-bold">주문번호 / 일시</th>
                <th className="px-6 py-4 font-bold">주문자 정보</th>
                <th className="px-6 py-4 font-bold">상품 상세</th>
                <th className="px-6 py-4 font-bold">결제 상태</th>
                <th className="px-6 py-4 font-bold text-right">
                  최종 결제금액
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  {/* 1. 주문번호 / 일시 */}
                  <td className="px-6 py-6 vertical-top">
                    <div className="font-mono text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {order.merchant_uid}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("ko-KR")}
                      <span className="ml-1 opacity-60">
                        {new Date(order.createdAt).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* 2. 주문자 정보 */}
                  <td className="px-6 py-6">
                    <div className="font-bold text-gray-900">
                      {order.buyerName}
                    </div>
                    <div className="text-base text-gray-500 mt-1 leading-relaxed">
                      {order.buyerTel}
                      <br />
                      <span className="text-gray-400 line-clamp-1">
                        {order.address}
                      </span>
                    </div>
                  </td>

                  {/* 3. 상품 상세: 여러 항목이 있을 경우 리스트로 */}
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      {order.orderItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="text-sm flex items-center gap-2"
                        >
                          <span className="text-gray-900 font-medium">
                            {item.product.name}
                          </span>
                          <span className="text-[11px] text-gray-400 px-1.5 py-0.5 bg-gray-100 rounded">
                            {item.quantity}개
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* 4. 결제 상태 */}
                  <td className="px-6 py-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold bg-gray-900 text-white">
                      결제완료
                    </span>
                  </td>

                  {/* 5. 최종 금액 */}
                  <td className="px-6 py-6 text-right">
                    <div className="text-lg font-black text-gray-900">
                      {order.totalPrice.toLocaleString()}
                      <span className="text-base ml-1 font-normal">원</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 하단 푸터 가이드 */}
      </main>
    </div>
  );
}
