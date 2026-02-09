import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "Admin") {
    return new NextResponse(
      JSON.stringify({ message: "접근 권한이 없습니다." }),
      { status: 403 }
    );
  }
  try {
    const body = await request.json();

    // ⚠️ 보안: 입력값 검증 추가
    if (
      !body.name ||
      typeof body.name !== "string" ||
      body.name.trim().length === 0
    ) {
      return new NextResponse(
        JSON.stringify({ message: "상품명은 필수입니다." }),
        { status: 400 }
      );
    }

    if (body.name.length > 100) {
      return new NextResponse(
        JSON.stringify({ message: "상품명은 100자 이하여야 합니다." }),
        { status: 400 }
      );
    }

    if (
      body.price === undefined ||
      typeof body.price !== "number" ||
      body.price < 0
    ) {
      return new NextResponse(
        JSON.stringify({ message: "유효한 가격을 입력해주세요." }),
        { status: 400 }
      );
    }

    if (
      body.stock !== undefined &&
      (typeof body.stock !== "number" || body.stock < 0)
    ) {
      return new NextResponse(
        JSON.stringify({ message: "재고는 0 이상의 숫자여야 합니다." }),
        { status: 400 }
      );
    }

    if (body.origin && body.origin.length > 50) {
      return new NextResponse(
        JSON.stringify({ message: "원산지는 50자 이하여야 합니다." }),
        { status: 400 }
      );
    }

    if (
      body.minOrderQty !== undefined &&
      (typeof body.minOrderQty !== "number" || body.minOrderQty < 1)
    ) {
      return new NextResponse(
        JSON.stringify({ message: "최소 주문 수량은 1개 이상이어야 합니다." }),
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name.trim(),
        description: body.description || null,
        imageUrl: body.imageUrl || null,
        price: Math.floor(body.price), // 소수점 제거
        stock: body.stock !== undefined ? Math.floor(body.stock) : 0,
        origin: body.origin?.trim() || "국내",
        weight: body.weight?.trim() || null,
        category: body.category?.trim() || "GULBI_10",
        shippingFee:
          body.shippingFee !== undefined ? Math.floor(body.shippingFee) : 3500,
        shippingMethod: body.shippingMethod?.trim() || "택배",
        minOrderQty:
          body.minOrderQty !== undefined ? Math.floor(body.minOrderQty) : 1,
      },
    });
    return NextResponse.json(
      {
        message: "상품이 성공적으로 등록되었습니다.",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("상품 등록 실패", error);
    return new NextResponse(
      JSON.stringify({ message: "상품 등록 중 서버 오류 발생" }),
      { status: 500 }
    );
  }
}
