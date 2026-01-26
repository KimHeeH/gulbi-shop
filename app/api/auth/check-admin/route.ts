import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ⚠️ 보안: 하드코딩된 kakaoId 제거, 세션 기반 인증으로 변경
export async function GET() {
  try {
    // 세션에서 현재 사용자 정보 가져오기
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    // 세션의 사용자 ID로 DB에서 역할 확인
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }, // role만 선택하여 불필요한 데이터 노출 방지
    });

    if (user?.role === "Admin") {
      return NextResponse.json({ isAdmin: true });
    }

    return NextResponse.json({ isAdmin: false }, { status: 403 });
  } catch (error) {
    // ⚠️ 보안: 에러 상세 정보는 노출하지 않음
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
