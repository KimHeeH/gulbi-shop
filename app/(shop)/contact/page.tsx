"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

// 💡 문의하기 페이지: 연락 채널 안내 + 간단 폼
export default function ContactPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (
      !customerName.trim() ||
      !customerEmail.trim() ||
      !customerMessage.trim()
    ) {
      setFormError("이름, 이메일, 문의 내용을 모두 입력해주세요.");
      return;
    }

    // 간단한 이메일 형식 확인
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(customerEmail.trim())) {
      setFormError("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    // 실제 전송 API가 준비되기 전까지는 성공 메시지만 표시
    setFormSuccess("문의가 접수되었습니다. 빠르게 답변드릴게요!");
    setCustomerName("");
    setCustomerEmail("");
    setCustomerMessage("");
  };

  return (
    <main className="w-full mx-auto max-w-5xl px-4 lg:px-0 py-12 space-y-12">
      {/* 히어로 */}

      {/* 연락처 카드 */}
      <section aria-labelledby="contact-channels" className="space-y-4">
        <div className="flex items-center justify-between h-40 gap-3">
          <div>
            <h2
              id="contact-channels"
              className="text-2xl font-semibold text-[#3C2F21]"
            >
              이렇게 문의하실 수 있어요
            </h2>
            <p className="text-sm text-gray-600">
              전화, 이메일, 카카오 채널 중 편한 방법을 선택하세요.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "전화 상담",
              value: "010-1234-5678",
              desc: "평일 09:00 - 18:00",
            },
            {
              title: "이메일",
              value: "help@gulbi-shop.com",
              desc: "24시간 접수 / 영업일 답변",
            },
          ].map((channel) => (
            <article
              key={channel.title}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow p-5 space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {channel.title}
              </h3>
              <p className="text-base font-medium text-[#3C2F21]">
                {channel.value}
              </p>
              <p className="text-sm text-gray-600">{channel.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 문의 폼 */}
    </main>
  );
}
