import { fetchGetProductData } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProductPageHeader from "@/components/ProductPageHeader";
import Header from "@/components/Header";

export default async function ProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await fetchGetProductData(id);
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session;
  if (!product) notFound();

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="md:hidden sticky top-0 z-50 bg-white/95 border-b">
        <ProductPageHeader />
      </div>
      <div className="hidden md:block border-b border-gray-100">
        <Header />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-16">
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* 1. 이미지 섹션: 장식 없이 깨끗하게 */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#fafafa] border border-gray-50">
            <Image
              unoptimized={true}
              src={product.imageUrl || "/img/no_img.png"}
              alt={product.name}
              fill
              className="object-contain p-6"
              priority
            />
          </div>

          {/* 2. 정보 섹션 */}
          <section className="flex flex-col pt-2">
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                {product.origin || "Premium Selection"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-gray-500 mt-1">{product.weight}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-lg font-medium">원</span>
              </div>
            </div>

            {/* 깔끔한 구분선 정보 리스트 */}
            <div className="border-t border-gray-100 py-8 space-y-6">
              <div className="flex text-sm">
                <span className="w-24 text-gray-400 font-medium">배송정보</span>
                <span className="text-gray-700">
                  무료배송 (3만원 이상 구매 시)
                </span>
              </div>
              <div className="flex text-sm">
                <span className="w-24 text-gray-400 font-medium">상품설명</span>
                <p className="flex-1 text-gray-600 leading-relaxed break-keep">
                  {product.description}
                </p>
              </div>
            </div>

            {/* 구매 버튼 영역 */}
            <div className="mt-auto pt-8 border-t border-gray-100">
              <ProductActions
                product={product}
                productId={id}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
