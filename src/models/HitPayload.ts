import {
  CustomDimensionsByIndex,
  CustomMetrics,
  CustomDimensionsByField
} from "./Custom";
import { Product, ProductAction } from "./Product";

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
 * The HitPayload object and possible values
 *
 * @interface HitPayload
 * @param {Product[]} products (Optional) Used for ecommerce
 * @param {Product[]} impressionProducts (Optional) Used for ecommerce
 * @param {string} impressionList (Optional) Used for ecommerce
 * @param {string} impressionSource (Optional) Used for ecommerce
 * @param {ProductAction} productAction (Optional) Used for ecommerce
 * @param {CustomDimensionsByIndex | CustomDimensionsByField} customDimensions (Optional)
 * @param {CustomMetrics} customMetrics (Optional)
 * @param {string} utmCampaignUrl (Optional) Used for campaigns
 * @param {string} session (Optional) Only two possible values, "start" or "end"
 */
