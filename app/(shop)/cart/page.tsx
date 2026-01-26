import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchGetCartItem } from "@/lib/data";
import { redirect } from "next/navigation";
import Link from "next/link";
import CartList from "@/components/CartList";
import { CartItem } from "@/types/cart"; // 👈 이름이 명확한 타입을 가져오세요

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  // 1. 로그인 여부만 먼저 체크 (어떤 방식이든 세션이 있으면 통과)
  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-4">로그인이 필요한 페이지입니다.</p>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          로그인하러 가기
        </Link>
      </div>
    );
  }

  // 2. 식별자 가져오기 (카카오면 kakaoId, 이메일이면 id나 email)
  // session.user.id 가 공통 식별자로 정의되어 있다면 그걸 쓰는 게 가장 좋습니다.
  const userId = session.user.id;

  if (!userId) {
    return <div>사용자 식별 정보를 찾을 수 없습니다.</div>;
  }

  // 3. fetch 함수에 식별자 전달
  const cartItems = await fetchGetCartItem(userId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 text-gray-900 border-b pb-6">
        장바구니
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed">
          <p className="text-gray-500 mb-6 text-lg">
            장바구니가 비어 있습니다.
          </p>
          <Link
            href="/products"
            className="bg-[#3C2F21] text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors"
          >
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        // 여기에 데이터를 넘겨줍니다.
        <CartList initialItems={cartItems} />
      )}
    </div>
  );
}
