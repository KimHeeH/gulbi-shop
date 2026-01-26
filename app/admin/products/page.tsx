"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
export default function AdminProductPage() {
  const [productName, setProductName] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productOrigin, setProductOrigin] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productImageFile, setProductImageFile] = useState<File | null>(null); // File 객체
  const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null); // 미리보기 URL (Blob URL 또는 Data URL)
  const [isUploading, setIsUploading] = useState(false); // 로딩 상태 추가
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleBack = () => {
    router.back();
  };
  // 이미지 파일을 선택했을 때 미리보기 URL을 생성하는 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);

      // 1. 미리보기: Data URL로 변환하여 즉시 사용자에게 보여줌
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrlPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProductImageFile(null);
      setImageUrlPreview(null);
    }
  };
  const resetForm = () => {
    setProductName("");
    setProductInfo("");
    setProductPrice("");
    setProductOrigin("");
    setProductWeight("");
    setProductImageFile(null);
    setImageUrlPreview(null);

    // 파일 인풋의 물리적인 값 비우기
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    let finalImageUrl = null;

    try {
      // ----------------------------------------------------
      // 1단계: Vercel Blob에 이미지 업로드 및 URL 받기
      // ----------------------------------------------------
      if (productImageFile) {
        const formData = new FormData();
        formData.append("image", productImageFile);

        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: formData, // FormData를 사용하면 Content-Type은 자동으로 설정됩니다.
        });
        console.log(uploadResponse);
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || "이미지 업로드 실패");
        }

        const result = await uploadResponse.json();
        finalImageUrl = result.url; // Vercel Blob에서 받은 최종 이미지 URL
      }

      // ----------------------------------------------------
      // 2단계: 상품 데이터 (URL 포함)를 Prisma API에 전송
      // ----------------------------------------------------
      const productData = {
        name: productName,
        imageUrl: finalImageUrl, // 업로드된 URL 사용
        description: productInfo,
        price: parseInt(productPrice) || 0,
        origin: productOrigin,
        weight: productWeight || null,
        // 누락된 필수 Prisma 필드 값 설정 (default 값이 있으나 명시적으로 전송)
        stock: 0,
        shippingFee: parseInt("3500") || 3500, // 상태 미추가로 임시 하드코딩
        shippingMethod: "택배",
        minOrderQty: 1,
      };

      const dbResponse = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!dbResponse.ok) {
        const errorData = await dbResponse.json();
        throw new Error(errorData.message || "상품 DB 등록 실패");
      }

      alert("✅ 상품 등록 및 이미지 업로드가 성공했습니다!");
      // 폼 초기화 로직 추가...
    } catch (error) {
      console.error("최종 등록 오류:", error);
      alert(`❌ 오류 발생: ${(error as Error).message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="cursor-pointer" onClick={handleBack}>
        뒤로가기
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          🛒 새로운 상품 추가
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            상품 상세 정보 입력
          </h2>

          {/* 상품명 */}
          <div className="space-y-2">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              상품명 <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="예: 맛있는 사과 1kg"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* 상품정보 (Textarea 사용) */}
          <div className="space-y-2">
            <label
              htmlFor="productInfo"
              className="block text-sm font-medium text-gray-700"
            >
              상품 상세 정보 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="productInfo"
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              rows={4}
              placeholder="상품의 특징, 보관 방법, 배송 정보 등을 상세히 입력하세요."
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* 상품 이미지 파일 */}
          {/* <div className="space-y-2">
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              상품 이미지 업로드
            </label>
            <input
              id="productImage"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {productImage && (
              <p className="text-xs text-gray-500 mt-1">
                선택된 파일: {productImage.name}
              </p>
            )}
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 상품 가격 */}
            <div className="space-y-2">
              <label
                htmlFor="productPrice"
                className="block text-sm font-medium text-gray-700"
              >
                상품 가격 (원) <span className="text-red-500">*</span>
              </label>
              <input
                id="productPrice"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="예: 15000"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* 상품 원산지 */}
            <div className="space-y-2">
              <label
                htmlFor="productOrigin"
                className="block text-sm font-medium text-gray-700"
              >
                원산지
              </label>
              <input
                id="productOrigin"
                type="text"
                value={productOrigin}
                onChange={(e) => setProductOrigin(e.target.value)}
                placeholder="예: 대한민국 경북"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* 상품 무게 */}
            <div className="space-y-2">
              <label
                htmlFor="productWeight"
                className="block text-sm font-medium text-gray-700"
              >
                무게 (g 또는 kg)
              </label>
              <input
                id="productWeight"
                type="text"
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
                placeholder="예: 500g 또는 2kg"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* 등록 버튼 */}
          {/* <div className="pt-4">
            <button
              type="submit"
              className="w-full justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              상품 등록하기
            </button>
          </div>
        </form> */}

          {/* ... (상품명, 상품정보 등 기존 필드 유지) ... */}

          {/* 상품 이미지 파일 (Vercel Blob 업로드용) */}
          <div className="space-y-2">
            <label
              htmlFor="productImageFile"
              className="block text-sm font-medium text-gray-700"
            >
              상품 이미지 업로드
            </label>
            <input
              id="productImageFile"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
              disabled={isUploading}
            />
            {/* ------------------------------------------------- */}
            {/* 이미지 미리보기 */}
            {imageUrlPreview && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-xs font-semibold mb-2">
                  선택된 파일 미리보기:
                </p>
                [Image of the product image]
                <img
                  src={imageUrlPreview}
                  alt="상품 이미지 미리보기"
                  className="mt-2 max-w-full h-auto max-h-60 object-contain rounded-md shadow-md"
                />
                {productImageFile && (
                  <p className="text-xs text-gray-500 mt-2">
                    파일명: {productImageFile.name} (
                    {Math.round(productImageFile.size / 1024)} KB)
                  </p>
                )}
              </div>
            )}
            {/* ------------------------------------------------- */}
          </div>

          {/* ... (상품 가격, 원산지, 무게 입력 필드 유지) ... */}

          {/* 등록 버튼 */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isUploading || !productName || !productPrice}
              className={`w-full justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transition duration-150 ease-in-out ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
            >
              {isUploading ? "업로드 및 등록 중..." : "상품 등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
