import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // 1. 주문 번호(id)로 주문 정보와 포함된 아이템들을 가져옵니다.
  const order = await prisma.order.findUnique({
    where: { id: id },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
          🎉 결제가 정상적으로 완료되었습니다!
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          주문해 주셔서 감사합니다. 곧 배송이 시작될 예정입니다.
        </p>
      </div>

      <div className="mt-12 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">📦 주문 정보</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">주문 번호 (ID)</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">결제 번호 (Merchant UID)</p>
              <p className="font-medium">{order.merchant_uid}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900"> 배송지 정보</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-500">수령인</p>
            <p className="font-medium">{order.buyerName}</p>
            <p className="mt-2 text-sm text-gray-500">주소</p>
            <p className="font-medium">{order.address}</p>
            <p className="mt-2 text-sm text-gray-500">연락처</p>
            <p className="font-medium">{order.buyerTel}</p>
          </div>
        </div>

        <div className="px-6 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            구매 상품 목록
          </h2>
          <ul className="divide-y divide-gray-200">
            {order.orderItems.map((item) => (
              <li key={item.id} className="py-4 flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-500">{item.quantity}개</p>
                </div>
                <p className="font-medium text-gray-900">
                  {item.price.toLocaleString()}원
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              총 결제 금액
            </span>
            <span className="text-2xl font-extrabold text-blue-600">
              {order.totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}
