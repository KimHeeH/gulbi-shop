"use server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
interface PaymentData {
  imp_uid: string;
  merchant_uid: string;
  paid_amount: number;
}

// 2. 배송 정보 타입
interface ShippingData {
  userId: string;
  name: string;
  phone: string;
  address: string;
  addressDetail?: string; // 상세주소는 없을 수도 있으므로 ? 처리
}

// 3. 장바구니 아이템 타입 (현재 프로젝트의 Product 구조에 맞춰 조정하세요)
interface CartItem {
  productId: number;
  quantity: number;
  product: {
    price: number;
    name: string;
  };
}
export async function createOrder(
  paymentData: PaymentData,
  shippingData: ShippingData,
  cartItems: CartItem[]
) {
  try {
    // 트랜잭션을 사용하면 주문 생성과 장바구니 비우기 중 하나라도 실패하면 전체 취소되어 안전합니다.
    const result = await prisma.$transaction(async (tx) => {
      // 1. DB에 주문 생성
      const order = await tx.order.create({
        data: {
          imp_uid: paymentData.imp_uid,
          merchant_uid: paymentData.merchant_uid,
          totalPrice: paymentData.paid_amount,
          buyerName: shippingData.name,
          buyerTel: shippingData.phone,
          address: `${shippingData.address} ${
            shippingData.addressDetail || ""
          }`.trim(),
          status: "PAID",
          userId: shippingData.userId,
          orderItems: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      });

      // 2. 장바구니 비우기
      await tx.cartItem.deleteMany({
        where: { userId: shippingData.userId },
      });

      return order;
    });

    revalidatePath("/cart");
    revalidatePath("/orders");

    return { success: true, orderId: result.id };
  } catch (error) {
    console.error("주문 생성 에러:", error);
    return { success: false, message: "주문 정보 저장에 실패했습니다." };
  }
}
