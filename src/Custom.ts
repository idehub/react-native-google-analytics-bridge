export interface CustomDimensionsFieldIndexMap {
  [key: string]: number;
}

export interface CustomDimensionsByIndex {
  [key: number]: number | string | boolean;
}

export interface CustomDimensionsByField {
  [key: string]: number | string | boolean;
}

export interface CustomMetrics {
  [key: number]: number;
}
