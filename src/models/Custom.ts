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

/**
 * A dictionary describing mapping of field names to indices for custom dimensions.
 * This is an optional object used by the tracker.
 * @example
 * // Create something like:
 * const fieldIndexMap = { customerType: 1 };
 * // Construct tracker with it:
 * const tracker = new GoogleAnalyticsTracker("UA-12345-3", fieldIndexMap);
 * // This allows you to send in customDimensions in the`HitPayload by field name instead of index:
 * tracker.trackScreenView("Home", { customDimensions: { customerType: "Premium" } });
 * // If you do not provide a map, you instead have to send in by index:
 * tracker.trackScreenView("Home", { customDimensions: { 1: "Premium" } });
 * @see CustomDimensionsFieldIndexMap
 * @see CustomDimensionsByField
 * @interface CustomDimensionsFieldIndexMap
 */

/**
 * A dictionary with custom dimensions values and their index keys.
 * @example
 * const customDimensions = { 1: "Premium", 3: "Beta", 5: 1200 }
 * tracker.trackScreenView("Home", { customDimensions });
 * @see CustomDimensionsFieldIndexMap
 * @see CustomDimensionsByField
 * @interface CustomDimensionsByIndex
 */

/**
 * A dictionary with custom dimensions values and their (mapped) field name keys.
 * In order to use this and send in custom dimensions by field name, you must have
 * provided a `CustomDimensionsFieldIndexMap` when constructing the tracker.
 * @example
 * const customDimensions = { customerType: "Premium", appType: "Beta", credit: 1200 }
 * tracker.trackScreenView("Home", { customDimensions });
 * @see CustomDimensionsFieldIndexMap
 * @see CustomDimensionsByIndex
 * @interface CustomDimensionsByField
 */

/**
 * A dictionary with custom metric values and their index keys.
 * @example
 * const customMetrics = { 1: 2389, 4: 15000 }
 * tracker.trackScreenView("Home", { customMetrics });
 * @interface CustomMetrics
 */
