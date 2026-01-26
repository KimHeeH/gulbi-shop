"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

type AuthSessionProviderProps = {
  children: ReactNode;
};

// next-auth 세션 컨텍스트를 전역으로 제공
export default function AuthSessionProvider({
  children,
}: AuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
