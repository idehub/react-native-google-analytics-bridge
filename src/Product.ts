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
 * @param {string} event
 * @param {string} id
 * @param {string} name
 * @param {string} category
 * @param {string} brand
 * @param {string} variant
 * @param {number} price
 * @param {string} couponCode
 * @param {number} quantity
 */

/**
 * Ecommerce Transaction
 *
 * @interface Transaction
 * @param {string} id
 * @param {string} affiliation
 * @param {number} revenue
 * @param {number} tax
 * @param {number} shipping
 * @param {string} couponCode
 */

/**
 * Ecommerce Product Action
 *
 * @interface ProductAction
 * @param {ProductActionEnum} action
 * @param {Transaction} transaction
 * @param {number} checkoutStep
 * @param {string} checkoutOption
 * @param {string} productActionList
 * @param {string} productListSource
 */
