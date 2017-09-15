import { CustomDimensionsByIndex, CustomMetrics } from "./Custom";
import { Product, ProductAction } from "./Product";

export interface HitPayload {
  products?: Product[];
  impressionProducts?: Product[];
  impressionList?: string;
  impressionSource?: string;
  productAction?: ProductAction;
  customDimensions?: CustomDimensionsByIndex;
  customMetrics?: CustomMetrics;
  utmCampaignUrl?: string;
  startSession?: number;
}
