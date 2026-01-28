export interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  price: number;
  origin: string | null;
  weight: string | null;
  description: string | null;
  shippingFee: number;
  shippingMethod: string;
  minOrderQty: number;
}
