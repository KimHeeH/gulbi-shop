import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // 세션 가져오기
import { authOptions } from "@/lib/auth";
export async function DELETE(req: Request) {
  try {
    // 1. 서버에서 직접 세션 확인 (클라이언트가 보내는 userId 불필요)
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const { cartItemId } = await req.json(); // productId(또는 cartItemId)만 받음

    // 2. 삭제 실행 (세션에 저장된 kakaoId와 cartItemId가 모두 일치해야 삭제)
    const deletedItem = await prisma.cartItem.deleteMany({
      where: {
        id: cartItemId,
        userId: session.user.kakaoId, // 서버가 알고 있는 본인의 ID만 대조
      },
    });

    if (deletedItem.count === 0) {
      return NextResponse.json(
        { message: "삭제할 권한이 없거나 아이템이 없습니다." },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "삭제 성공" });
  } catch (error) {
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
