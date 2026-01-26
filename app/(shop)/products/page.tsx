import { fetchAllProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
export const revalidate = 0;
export default async function ProductPage() {
  const products = await fetchAllProducts();

  return (
    // 모바일에서는 양옆 패딩을 줄여서 상품 이미지를 더 크게 보이게 합니다.
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 mb-20">
      {/* 1. 앱 스타일 헤더: 상단 고정 느낌 */}
      <div className="flex flex-col mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          전체 상품{" "}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          창근수산에서 엄선한 굴비 세트
        </p>
      </div>

      {/* 2. 상품 그리드: 모바일 2열 고정, 간격 최적화 */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed">
          <p className="text-gray-400 font-medium">등록된 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
