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
  category: Category;
}
export enum Category {
  GULBI_10 = "GULBI_10",
  GULBI_20 = "GULBI_20",
  BARLEY_GULBI = "BARLEY_GULBI",
  FERMENTED_ETC = "FERMENTED_ETC",
}