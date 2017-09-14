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
