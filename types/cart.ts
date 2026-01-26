import { Product } from "./product";
export interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  product: Product;
}
