import { CustomDimensionsByIndex, CustomMetrics } from "./Custom";
import { Product, ProductAction } from "./Product";

export interface HitPayload {
  products?: Product[];
  impressionProducts?: Product[];
  productAction?: ProductAction;
  customDimensions?: CustomDimensionsByIndex;
  customMetrics?: CustomMetrics;
  utmCampaignUrl?: string;
  startSession?: number;
}
