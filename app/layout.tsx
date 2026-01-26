// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
export const metadata: Metadata = {
  title: "미다감 굴비",
  description: "미다감 굴비 쇼핑몰",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthSessionProvider>
          {/* 전역 헤더 및 페이지 내용에 세션 정보 제공 */}
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
