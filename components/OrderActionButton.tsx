"use client"; // 여기가 핵심입니다!

import { useState } from "react";
import DeliveryModal from "./DeliveryModal";

export default function OrderActionButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2 w-full h-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 h-full bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 active:bg-gray-100 transition-colors"
        >
          배송조회
        </button>
        <button className="flex-1 h-full bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 active:bg-gray-100 transition-colors">
          문의하기
        </button>
      </div>

      <DeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
