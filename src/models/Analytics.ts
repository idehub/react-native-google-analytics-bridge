import {
  CustomDimensionsByIndex,
  CustomMetrics,
  CustomDimensionsByField
} from "./Custom";
import { Product, ProductAction } from "./Product";

export interface EventMetadata {
  label?: string;
  value?: number;
}

export interface TimingMetadata {
  name: string;
  label?: string;
}

export interface HitPayload {
  products?: Product[];
  impressionProducts?: Product[];
  impressionList?: string;
  impressionSource?: string;
  productAction?: ProductAction;
  customDimensions?: CustomDimensionsByIndex | CustomDimensionsByField;
  customMetrics?: CustomMetrics;
  utmCampaignUrl?: string;
  session?: SessionState;
}

export enum SessionState {
  Start = "start",
  End = "end"
}

/**
 *
 * Used when tracking event
 *
 * @interface EventMetadata
 * @example
 * const eventMetadata = { label: "v1.0.3", value: 22 }
 * tracker.trackEvent("FinalizeOrderButton", "Click", eventMetadata);
 * @param {string} label (Optional)
 * @param {number} value (Optional)
 */

/**
 *
 * Used when tracking time measurements
 *
 * @interface TimingMetadata
 * @example
 * const timingMetadata = { name: "LoadList" } // name is a required value when tracking timing
 * tracker.trackTiming("testcategory", 13000, timingMetadata);
 * @param {string} name (Required)
 * @param {string} label (Optional)
 */

/**
 * The HitPayload object and possible values
 *
 * Used by the different tracking methods for adding metadata to the hit.
 *
 * @interface HitPayload
 * @example
 * // If you want to do send a purchase payload with an event:
 * const product = {
 *   id: "P12345",
 *   name: "Android Warhol T-Shirt",
 *   category: "Apparel/T-Shirts",
 *   brand: "Google",
 *   variant: "Black",
 *   price: 29.2,
 *   quantity: 1,
 *   couponCode: "APPARELSALE"
 * };
 * const transaction = {
 *   id: "T12345",
 *   affiliation: "Google Store - Online",
 *   revenue: 37.39,
 *   tax: 2.85,
 *   shipping: 5.34,
 *   couponCode: "SUMMER2013"
 * };
 * const productAction = {
 *   transaction,
 *   action: 7 // Purchase action, see ProductActionEnum
 * }
 * const payload = { products: [ product ], productAction: productAction }
 * tracker.trackEvent("FinalizeOrderButton", "Click", null, payload);
 * @example
 * // If you want to send custom dimensions with a screen view:
 * const customDimensions = {
 *   1: "Beta",
 *   3: "Premium"
 * };
 * const payload = { customDimensions };
 * tracker.trackScreenView("SaleScreen", payload);
 * @param {Product[]} products (Optional) Used for ecommerce
 * @param {Product[]} impressionProducts (Optional) Used for ecommerce
 * @param {string} impressionList (Optional) Used for ecommerce
 * @param {string} impressionSource (Optional) Used for ecommerce
 * @param {ProductAction} productAction (Optional) Used for ecommerce
 * @param {CustomDimensionsByIndex | CustomDimensionsByField} customDimensions (Optional)
 * @param {CustomMetrics} customMetrics (Optional)
 * @param {string} utmCampaignUrl (Optional) Used for campaigns
 * @param {string} session (Optional) Only two possible values, "start" or "end". This will either start or end a session.
 */
