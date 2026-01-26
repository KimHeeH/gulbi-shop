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
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        price: body.price,
        stock: body.stock,
        origin: body.origin,
        weight: body.weight,
        shippingFee: body.shippingFee,
        shippingMethod: body.shippingMethod,
        minOrderQty: body.minOrderQty,
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
