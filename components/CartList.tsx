"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types/cart";
import { useRouter } from "next/navigation";

export default function CartList({
  initialItems,
}: {
  initialItems: CartItem[];
}) {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  // 계산 로직 (배송비 제외 순수 상품가)
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 0 ? 4500 : 0;
  const totalPrice = subtotal + shippingFee;

  const handleOrder = () => {
    if (items.length > 0) router.push("/checkout");
  };

  const updateQuantity = async (id: number, delta: number) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;
    const newQuantity = Math.max(1, currentItem.quantity + delta);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      const response = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItemId: id,
          quantity: newQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error("수량 업데이트 실패");
      }
    } catch (error) {
      alert("수량 변경 중 오류가 발생했습니다.");
      setItems(initialItems);
    }
  };

  const removeItem = async (cartItemId: number) => {
    const response = await fetch("/api/cart/delete", {
      method: "DELETE",
      body: JSON.stringify({ cartItemId }),
    });
    if (response.ok)
      setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 상품 목록 (80%) */}
      <div className="lg:col-span-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-50 border flex-shrink-0">
              <Image
                src={item.product.imageUrl || "/img/no_img.png"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow min-w-0">
              <h3 className="font-bold text-lg text-gray-900 truncate mb-1">
                {item.product.name}
              </h3>
              <p className="text-gray-500 font-medium mb-4">
                {item.product.price.toLocaleString()}원
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1.5 hover:bg-white rounded-md transition-colors text-gray-600"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 hover:bg-white rounded-md transition-colors text-gray-600"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-xl font-black text-gray-900">
                {(item.product.price * item.quantity).toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 결제 요약 박스 (40%) - Sticky 적용 */}
      <aside className="lg:col-span-4 sticky top-24">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-6 border-b bg-gray-50/30">
            <h2 className="font-bold text-lg text-gray-800">결제 예정 금액</h2>
          </div>
          <div className="p-8 space-y-4">
            <div className="flex justify-between text-gray-500">
              <span className="font-medium">총 상품금액</span>
              <span className="text-gray-900 font-bold">
                {subtotal.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span className="font-medium">배송비</span>
              <span className="text-gray-900 font-bold">
                +{shippingFee.toLocaleString()}원
              </span>
            </div>

            <div className="border-t border-dashed pt-6 mt-6">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">총 결제금액</span>
                <span className="text-3xl font-black text-black-600">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="mt-8 w-full bg-[#3182f6] text-white py-5 rounded-2xl font-black text-lg mt-8 hover:bg-[#1b64da] transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-100 active:scale-95"
            >
              {items.length}건 주문하기
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
