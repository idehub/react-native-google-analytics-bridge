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

/**
 * Ecommerce ProductActionEnum
 *
 * The type of Product Action. The possible values (numbers) are:
 * Detail = 1,
 * Click = 2,
 * Add = 3,
 * Remove = 4,
 * Checkout = 5,
 * CheckoutOption = 6,
 * Purchase = 7,
 * Refund = 8
 *
 * @export
 * @enum {number}
 */
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

/**
 * Ecommerce Product
 *
 * @interface Product
 * @param {string} id
 * @param {string} name
 * @param {string} category (Optional)
 * @param {string} brand (Optional)
 * @param {string} variant (Optional)
 * @param {number} price (Optional)
 * @param {string} couponCode (Optional)
 * @param {number} quantity (Optional)
 */

/**
 * Ecommerce Transaction
 *
 * @interface Transaction
 * @param {string} id
 * @param {string} affiliation (Optional)
 * @param {number} revenue (Optional - but not really)
 * @param {number} tax (Optional)
 * @param {number} shipping (Optional)
 * @param {string} couponCode (Optional)
 */

/**
 * Ecommerce Product Action
 *
 * @interface ProductAction
 * @param {ProductActionEnum} action
 * @param {Transaction} transaction (Optional - but not really)
 * @param {number} checkoutStep (Optional)
 * @param {string} checkoutOption (Optional)
 * @param {string} productActionList (Optional)
 * @param {string} productListSource (Optional)
 */
