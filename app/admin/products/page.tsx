import { fetchAllProducts } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit3, Trash2, ExternalLink } from "lucide-react";

export const revalidate = 5;

export default async function AdminProductPage() {
  const products = await fetchAllProducts();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* 상단 액션 바 */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">
              등록된 상품 내역
            </h1>
          </div>

          <Link
            href="/admin/products/register"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
          >
            <Plus size={18} />
            <span>새 상품 등록</span>
          </Link>
        </header>

        {/* 상품 통계 요약 (엑셀 대시보드 느낌) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl">
            {" "}
            전체 상품 수
            <p className="text-lg font-bold text-gray-400 uppercase mb-2">
              {products.length}
            </p>
          </div>
        </div>

        {/* 상품 리스트 테이블 */}
        <div className="overflow-x-auto border-t-2 border-black">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 text-left text-lg uppercase tracking-widest text-gray-500 border-b">
                <th className="px-6 py-4 font-bold">상품 정보</th>
                <th className="px-6 py-4 font-bold">카테고리/원산지</th>
                <th className="px-6 py-4 font-bold text-right">판매가</th>
                <th className="px-6 py-4 font-bold text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  {/* 상품 정보 (이미지 + 이름) */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded border bg-gray-50 overflow-hidden flex-shrink-0">
                        <Image
                          src={product.imageUrl || "/img/no_img.png"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-900 line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-lg text-gray-400 font-mono mt-0.5 uppercase">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 카테고리/원산지 */}
                  <td className="px-6 py-4">
                    <div className="text-lg font-medium text-gray-600">
                      {product.origin || "상세참조"}
                    </div>
                    <div className="text-lg text-gray-400 mt-1">
                      {product.weight || "-"}
                    </div>
                  </td>

                  {/* 판매가 */}
                  <td className="px-6 py-4 text-right">
                    <div className="font-bold text-lg">
                      {product.price.toLocaleString()}원
                    </div>
                  </td>

                  {/* 상태 태그 */}

                  {/* 관리 버튼 */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-900 border rounded hover:bg-white transition-colors"
                        title="미리보기"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 border rounded hover:bg-white transition-colors"
                        title="수정"
                      >
                        <Edit3 size={14} />
                      </Link>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 border rounded hover:bg-white transition-colors"
                        title="삭제"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
