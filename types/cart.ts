import { Product } from "./product";
export interface CartItem {
  id: number;
  userId: string;
  productId: string;
  quantity: number;
  product: Product;
}
