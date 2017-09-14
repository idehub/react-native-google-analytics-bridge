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
  startSession?: number;
}

/**
 * The HitPayload object and possible values
 *
 * @interface HitPayload
 * @param {Product[]} products
 * @param {Product[]} impressionProducts
 * @param {string} impressionList
 * @param {string} impressionSource
 * @param {ProductAction} productAction
 * @param {CustomDimensionsByIndex | CustomDimensionsByField} customDimensions
 * @param {CustomMetrics} customMetrics
 * @param {string} utmCampaignUrl
 * @param {number} startSession
 */
