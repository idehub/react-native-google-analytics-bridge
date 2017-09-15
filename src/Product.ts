export default interface Product {
  id: string;
  name: string;
  category?: string;
  brand?: string;
  variant?: string;
  price?: number;
  quantity?: number;
  couponCode?: string;
};

export enum ProductAction {
  Detail = 1,
  Click = 2,
  Add = 3,
  Remove = 4,
  Checkout = 5,
  CheckoutOption = 6,
  Purchase = 7,
  Refund = 8
}
