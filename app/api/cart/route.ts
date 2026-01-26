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

    // ⚠️ 보안: 입력값 검증 추가
    if (
      !productId ||
      (typeof productId !== "number" && isNaN(Number(productId)))
    ) {
      return NextResponse.json(
        { message: "유효하지 않은 상품 ID입니다." },
        { status: 400 }
      );
    }

    if (
      !quantity ||
      (typeof quantity !== "number" && isNaN(Number(quantity)))
    ) {
      return NextResponse.json(
        { message: "유효하지 않은 수량입니다." },
        { status: 400 }
      );
    }

    const parsedProductId = Number(productId);
    const parsedQuantity = Number(quantity);

    // 수량이 양수인지 확인
    if (parsedQuantity <= 0 || parsedQuantity > 999) {
      return NextResponse.json(
        { message: "수량은 1개 이상 999개 이하여야 합니다." },
        { status: 400 }
      );
    }

    // 상품이 실제로 존재하는지 확인
    const productExists = await prisma.product.findUnique({
      where: { id: parsedProductId },
      select: { id: true }, // 존재 여부만 확인
    });

    if (!productExists) {
      return NextResponse.json(
        { message: "존재하지 않는 상품입니다." },
        { status: 404 }
      );
    }

    // 3. 중복 확인 (userId 컬럼에 이제 이메일이 들어갑니다)
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: userId,
        productId: parsedProductId,
      },
    });

    if (existingItem) {
      // 기존 수량과 새 수량의 합이 999를 초과하지 않도록 검증
      const newQuantity = existingItem.quantity + parsedQuantity;
      if (newQuantity > 999) {
        return NextResponse.json(
          { message: "장바구니 수량은 999개를 초과할 수 없습니다." },
          { status: 400 }
        );
      }

      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
      return NextResponse.json(updatedItem);
    }

    // 4. 새 아이템 생성
    const newItem = await prisma.cartItem.create({
      data: {
        userId: userId,
        productId: parsedProductId,
        quantity: parsedQuantity,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("장바구니 추가 에러:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
