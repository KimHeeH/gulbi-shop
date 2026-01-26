import { CartItem } from "./cart";

/**
 * 주문 상태 타입
 * - PENDING: 결제 대기
 * - PAID: 결제 완료
 * - CANCELLED: 결제 취소
 * - FAILED: 결제 실패
 */
export type OrderStatus = "PENDING" | "PAID" | "CANCELLED" | "FAILED";

/**
 * 배송 정보 인터페이스
 */
export interface ShippingInfo {
  name: string; // 수령인 이름
  phone: string; // 연락처 (01012345678)
  zipcode: string; // 우편번호
  address: string; // 기본 주소
  addressDetail: string; // 상세 주소
  memo?: string; // 배송 메모
}

/**
 * 결제 결과 인터페이스 (KG 이니시스/포트원 응답 객체 기준)
 */
export interface PaymentResult {
  imp_uid: string; // 포트원 결제 고유 번호
  merchant_uid: string; // 상점 주문 번호
  pay_method: string; // 결제 수단 (card, trans 등)
  paid_amount: number; // 결제 금액
  status: string; // 결제 상태
}

/**
 * 최종 주문 데이터 인터페이스
 */
export interface Order {
  id?: string; // 주문 고유 ID (DB 생성)
  orderNumber: string; // 주문 번호 (예: 20251229-XXXX)
  userId: string; // 주문자 식별자 (kakaoId)
  items: CartItem[]; // 주문 당시의 상품 리스트
  totalPrice: number; // 최종 결제 금액
  shippingInfo: ShippingInfo;
  status: OrderStatus;
  createdAt?: Date;
}
export interface OrderedItem {
  id: string;
  imp_uid: string;
  merchant_uid: string;
  total_price: number;
  buyerName: string;
  buyerTel: string;
  address: string;
  status: string;
  createdAt: Date;
  userId: string;
  orderItems: Order[];
}
