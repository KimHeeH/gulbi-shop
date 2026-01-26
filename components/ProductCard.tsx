import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product.id) return null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col w-full bg-white transition-all"
    >
      <article>
        {/* 1. 이미지: 정사각형으로 변경하여 높이 감소 */}
        <div className="border-2 relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
          <Image
            unoptimized={true}
            src={product.imageUrl || "/images/default-product.jpg"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />

          {/* 하단 퀵 메뉴: 더 심플하게 */}
          <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-1.5 rounded-md text-xs font-semibold shadow-sm">
              + 장바구니 담기
            </button>
          </div>
        </div>

        {/* 2. 정보 섹션: 간격을 좁히고 텍스트 크기 조절 */}
        <div className="mt-2.5 space-y-0.5 px-0.5">
          <h3 className="text-sm lg:text-xl font-medium text-gray-800 line-clamp-1 group-hover:underline">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString()}원
            </span>
            {/* 할인율이 필요 없다면 이 줄은 삭제하세요 */}
            <span className="text-xs font-bold text-red-500">10%</span>
          </div>

          {/* 설명을 한 줄로 제한하거나 아예 삭제해서 높이를 줄임 */}
          <p className="text-xs lg:text-base text-gray-400 line-clamp-1">
            {product.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
