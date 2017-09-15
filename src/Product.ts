export interface Product {
  id: string;
  name: string;
  category?: string;
  brand?: string;
  variant?: string;
  price?: number;
  couponCode?: string;
  quantity?: number;
}

export enum ProductActionEnum {
  Detail = 1,
  Click = 2,
  Add = 3,
  Remove = 4,
  Checkout = 5,
  CheckoutOption = 6,
  Purchase = 7,
  Refund = 8
}

export interface Transaction {
  id: string;
  affiliation?: string;
  revenue?: number;
  tax?: number;
  shipping?: number;
  couponCode?: string;
}

export interface ProductAction {
  action: ProductActionEnum;
  transaction?: Transaction;
  checkoutStep?: number;
  checkoutOption?: string;
  productActionList?: string;
  productListSource?: string;
}
