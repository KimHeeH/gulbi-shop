import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchGetCartItem } from "@/lib/data";
import Link from "next/link";
import CartList from "@/components/CartList";

export const revalidate = 0;

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-sm border text-center">
          <p className="text-gray-500 mb-6 text-lg">
            로그인이 필요한 페이지입니다.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            로그인하러 가기
          </Link>
        </div>
      </div>
    );
  }

  const userId = session.user.id;
  const cartItems = await fetchGetCartItem(userId);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            장바구니
          </h1>
          <p className="text-gray-500 mt-2">
            담아두신 상품을 확인하고 주문을 진행해 주세요.
          </p>
        </header>

        {cartItems.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-gray-500 mb-8 text-xl font-medium">
              장바구니가 비어 있습니다.
            </p>
            <Link
              href="/products"
              className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200"
            >
              인기 상품 보러가기
            </Link>
          </div>
        ) : (
          <CartList initialItems={cartItems} />
        )}
      </div>
    </div>
  );
}
