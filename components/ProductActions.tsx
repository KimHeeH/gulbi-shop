"use client";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, X, ChevronDown, Check } from "lucide-react";

export default function ProductActions({
  productId,
  isLoggedIn,
  product,
}: {
  productId: number;
  isLoggedIn: boolean;
  product: Product;
}) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  // ⚠️ 보안: 로그인 상태는 민감 정보이므로 로깅하지 않습니다
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    // 바로구매 시에도 수량 정보를 포함하여 이동
    router.push(`/checkout?id=${productId}&quantity=${quantity}`);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
      return;
    }

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });

    if (res.ok) {
      if (
        confirm("장바구니에 담겼습니다! 장바구니 페이지로 이동하시겠습니까?")
      ) {
        router.push("/cart");
      }
    } else {
      const errorData = await res.json();
      alert(errorData.message || "장바구니 추가에 실패했습니다.");
    }
  };

  return (
    <div>
      {/* 데스크탑 버튼 */}
      <div className="hidden lg:flex mt-8 flex-col gap-3">
        <button
          onClick={handleBuyNow}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-[0.98]"
        >
          바로 구매하기
        </button>
        <button
          onClick={handleAddToCart}
          className="w-full py-4 border border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          장바구니 담기
        </button>
      </div>

      {/* 모바일 구매 버튼 */}
      <div className="flex lg:hidden gap-3 fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-100 z-40">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800"
        >
          구매하기
        </button>
      </div>

      {/* 옵션 드로어 (모바일 전용) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="flex flex-col relative bg-white rounded-t-2xl p-6 shadow-2xl min-h-[40vh] animate-slide-up">
            {/* 옵션 선택 영역 */}
            <div
              className={`border-2 rounded-xl overflow-hidden ${
                isOptionOpen ? "border-green-500" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setIsOptionOpen(!isOptionOpen)}
                className="w-full p-4 flex justify-between items-center bg-white"
              >
                <span
                  className={
                    selectedOption ? "text-gray-900 font-bold" : "text-gray-400"
                  }
                >
                  {selectedOption || "옵션을 선택해주세요"}
                </span>
                <ChevronDown
                  className={
                    isOptionOpen
                      ? "rotate-180 transition-transform"
                      : "transition-transform"
                  }
                />
              </button>

              {isOptionOpen && (
                <div className="border-t border-gray-100 bg-white">
                  <button
                    onClick={() => {
                      setSelectedOption(product.name);
                      setIsOptionOpen(false);
                    }}
                    className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-700">
                        {product.name}
                      </span>
                      <span className="text-gray-400">
                        {product.price.toLocaleString()}원
                      </span>
                    </div>
                    {selectedOption === product.name && (
                      <Check size={18} className="text-green-600" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* 수량 조절 영역 (옵션 선택 시 노출) */}
            {selectedOption && (
              <div className="bg-gray-50 rounded-xl mt-4 p-4 border relative">
                <button
                  onClick={() => setSelectedOption(undefined)}
                  className="absolute top-3 right-3 text-gray-400"
                >
                  <X size={18} />
                </button>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center border rounded-lg bg-white">
                    <button
                      onClick={handleDecrease}
                      className="px-3 py-1 border-r font-bold"
                    >
                      －
                    </button>
                    <span className="px-4 py-1 text-center min-w-[40px]">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="px-3 py-1 border-l font-bold"
                    >
                      ＋
                    </button>
                  </div>
                  <div className="text-right font-bold text-lg text-gray-900">
                    {(product.price * quantity).toLocaleString()}원
                  </div>
                </div>
              </div>
            )}

            {/* 최종 액션 버튼 */}
            <div className="flex w-full gap-3 mt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 border rounded-xl font-bold text-gray-700"
              >
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-black text-white rounded-xl font-bold disabled:bg-gray-200"
                disabled={!selectedOption}
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
