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
  // 총 상품 금액 계산
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity + 3500,
    0
  );
  const handleOrder = () => {
    // 상품이 있을 때만 이동
    if (initialItems.length > 0) {
      router.push("/order");
    }
  };
  const updateQuantity = (id: number, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  const removeItem = async (cartItemId: number) => {
    const response = await fetch("/api/cart/delete", {
      method: "DELETE",
      body: JSON.stringify({ cartItemId }),
    });

    if (response.ok) {
      setItems((prev) => prev.filter((item) => item.id !== cartItemId));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* 아이템 목록 */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm"
          >
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={item.product.imageUrl || "/img/no_img.png"}
                alt={item.product.name}
                fill
                sizes="96px" // w-24 (24 * 4px = 96px) 에 맞춤
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {item.product.price.toLocaleString()}원
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, +1)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-900 mb-2">
                {(item.product.price * item.quantity).toLocaleString()}원
              </p>
              <button
                className="text-red-400 hover:text-red-600 p-1"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 결제 요약 섹션 */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 p-6 rounded-2xl border sticky top-24">
          <h2 className="text-lg font-bold mb-4">결제 정보</h2>
          <div className="space-y-3 pb-4 border-b">
            <div className="flex justify-between text-gray-600">
              <span>총 상품금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>배송비</span>
              <span>3500원</span>
            </div>
          </div>
          <div className="flex justify-between py-4 text-xl font-extrabold text-[#3C2F21]">
            <span>총 결제금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <button
            onClick={handleOrder}
            className="w-full bg-[#3C2F21] text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors shadow-lg"
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}
