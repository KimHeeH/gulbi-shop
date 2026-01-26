"use client";

import { X, Phone, MessageCircle } from "lucide-react";

export default function DeliveryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* 모달 본체 */}
      <div className="relative bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="text-blue-500" size={30} />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            배송 조회 안내
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            현재 택배사 자동 연동 준비 중입니다.
            <br />
            배송 현황이 궁금하시면 아래 연락처로
            <br />
            문의해주시면 친절히 안내해 드립니다! 🐟
          </p>

          <div className="space-y-3">
            <a
              href="tel:010-1234-5678" // 실제 사장님 번호로 수정
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              <Phone size={18} />
              전화 문의하기
            </a>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
