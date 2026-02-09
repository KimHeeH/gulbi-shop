"use server";
import { prisma } from "./prisma";
import { Product } from "@/types/product";
// 1. 포트원 결제 응답 타입
import { Prisma } from "@prisma/client";
export async function fetchAllProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        origin: true,
        weight: true,
        shippingFee: true,
        shippingMethod: true,
        minOrderQty: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return products as Product[];
  } catch (error) {
    console.error(
      "Database Error: 상품 목록을 가져오는 데 실패했습니다.",
      error
    );
    throw new Error("Failed to fetch product data.");
  }
}
export async function fetchGetProductData(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}
export async function fetchGetCartItem(userId: string) {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return cartItems;
  } catch (error) {
    console.error(
      "Database Error: 장바구니 목록을 가져오는 데 실패했습니다.",
      error
    );
    throw new Error("Failed to fetch cart data.");
  }
}
export async function deleteCartItem(userId: string, id: number) {
  try {
    const cartItems = await prisma.cartItem.findUnique({
      where: {
        userId: userId,
        id: id,
      },
      include: {
        product: true,
      },
    });
    return cartItems;
  } catch (error) {
    console.error(
      "Delete Cart Items: 장바구니 아이템 삭제를 실패했습니다.",
      error
    );
    throw new Error("Failed to delete cart items");
  }
}
export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: { product: true }; // 상품 상세 정보까지 포함
    };
  };
}>;
export async function fetchOrderItem() {
  try {
    const orderItems = await prisma.order.findMany({
      include: {
        orderItems: {
          include: { product: true }, // 상품 상세 정보까지 포함
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return orderItems;
  } catch (error) {
    console.error(
      "Fetch Order Items: 주문된 상품을 불러오지 못했습니다.",
      error
    );
    throw new Error("Failed to fetch order items");
  }
}
export async function fetchMyOrderItem(userId: string) {
  try {
    // ⚠️ 보안: 사용자 ID와 주문 정보는 민감 정보이므로 로깅하지 않습니다

    const orders = await prisma.order.findMany({
      where: {
        userId: userId, // schema에 정의된 userId 필드
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // 최신순 정렬
      },
    });

    // ⚠️ 보안: 주문 개수도 민감 정보이므로 로깅하지 않습니다
    return orders.map((order) => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
    }));
  } catch (error) {
    // 에러 로깅은 유지하되, 민감한 정보는 포함하지 않습니다
    console.error("Prisma Fetch Error: 주문 내역 조회 중 DB 오류 발생", error);
    throw new Error("주문 내역 조회 중 DB 오류가 발생했습니다.");
  }
}
