// /app/page.tsx (서버 컴포넌트)

import { fetchAllProducts } from "@/lib/data";
import HomeClient from "@/components/HomeClient";
import { Product } from "@/types/product";
export const revalidate = 0;
export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    // 서버에서 안전하게 데이터 페칭
    products = await fetchAllProducts();
  } catch (err) {
    console.error("데이터 로딩 중 서버 오류 발생:", err);
    error = "상품 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.";
  }

  // 서버 컴포넌트가 클라이언트 컴포넌트에 데이터를 Props로 전달
  return <HomeClient products={products} error={error} />;
}
