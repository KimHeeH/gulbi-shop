import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(req: Request) {
  try {
    // 1. 서버 세션 확인 (클라이언트가 준 userId는 믿지 않습니다)
    const session = await getServerSession(authOptions);

    // 2. 이메일을 최우선 식별자로 사용 (카카오든 이메일 로그인이든 공통)
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { productId, quantity } = await req.json();

    // 3. 중복 확인 (userId 컬럼에 이제 이메일이 들어갑니다)
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: userId,
        productId: Number(productId),
      },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + Number(quantity) },
      });
      return NextResponse.json(updatedItem);
    }

    // 4. 새 아이템 생성
    const newItem = await prisma.cartItem.create({
      data: {
        userId: userId,
        productId: Number(productId),
        quantity: Number(quantity),
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("장바구니 추가 에러:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
