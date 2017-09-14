export interface OptionalValue {
  label: string;
  value: number;
}

export interface OptionalTimingValue {
  name: string;
  label?: string;
}

export interface CustomDimensionsFieldIndexMap {
  [key: string]: number;
}

export interface CustomDimensionsByIndex {
  [key: number]: any;
}

export interface CustomDimensionsByField {
  [key: string]: any;
}

export interface CustomMetrics {
  [key: number]: number;
}
