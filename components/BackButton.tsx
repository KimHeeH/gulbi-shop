"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="p-1 -ml-1 flex items-center justify-center text-gray-700 hover:text-black transition-colors"
      aria-label="뒤로 가기"
    >
      <ArrowLeft size={28} strokeWidth={2.5} />
    </button>
  );
}
