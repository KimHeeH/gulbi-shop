import { fetchGetProductData } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
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

  const product = await fetchGetProductData(Number(id));
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";

  const isLoggedIn = !!session;
  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="flex md:hidden overflow-y-auto ">
        <ProductPageHeader />
      </div>
      <div className="hidden md:flex">
        <Header />
      </div>
      <main className="max-w-6xl  mx-auto px-0 md:px-4 py-0 md:py-12 bg-white pb-32 md:pb-12">
        {/* article 태그는 독립적인 하나의 콘텐츠(상품)임을 명시합니다 */}
        <article className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-start">
          {/* 1. 비주얼 섹션 (figure) */}
          <figure className="px-20  relative w-full aspect-square md:rounded-2xl overflow-hidden bg-gray-50 md:shadow-inner">
            <Image
              unoptimized={true}
              src={product.imageUrl || "/img/no_img.png"}
              alt={`${product.name} 상품 이미지`} // alt도 더 구체적으로 작성
              fill
              className=" md:object-contain"
              priority
            />
            {/* 화면에는 보이지 않지만 스크린 리더는 읽을 수 있는 캡션 (선택사항) */}
            <figcaption className="sr-only">
              {product.name}의 상세 이미지입니다.
            </figcaption>
          </figure>

          {/* 2. 정보 및 구매 섹션 (section) */}
          <section className=" flex flex-col gap-3 px-4 py-8 md:px-0 md:py-0">
            <header className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-gray-50 text-red-600 text-xs md:text-sm font-semibold tracking-wide">
                인기상품
              </span>
              <div className="flex gap-4">
                {" "}
                <h1 className="text-xl lg:text-3xl md:text-4xl  text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed break-keep">
                  {product.weight}
                </p>
              </div>
            </header>

            {/* 가격 정보 */}
            <div className="border-b border-gray-100 pb-6">
              <strong className="text-xl md:text-4xl font-semibold text-gray-800">
                {product.price.toLocaleString()}
              </strong>
              <span className="text-xl font-bold text-gray-900 ml-1">원</span>
            </div>

            {/* 상세 설명 섹션 */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                상품 설명
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed break-keep">
                {product.description}
              </p>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed break-keep">
                {product.origin}
              </p>
            </div>

            {/* 인터랙션 영역 (장바구니, 구매 버튼 등) */}
            <footer className=" mt-4">
              <ProductActions
                product={product}
                productId={Number(id)}
                isLoggedIn={isLoggedIn}
              />
            </footer>
          </section>
        </article>
      </main>
    </>
  );
}
