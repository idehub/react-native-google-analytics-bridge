import { GoogleAnalyticsBridge } from "./NativeBridges";

import {
  CustomDimensionsByField,
  CustomDimensionsByIndex,
  CustomDimensionsFieldIndexMap,
  CustomMetrics,
  OptionalTimingValue,
  OptionalValue
} from "./Values";
import Product from "./Product";
import Transaction from "./Transaction";

/**
 * Custom dimensions accept only strings and numbers.
 * @param customDimensionVal
 * @returns {boolean}
 */
function isValidCustomDimension(customDimensionVal) {
  const customDimensionValType = typeof customDimensionVal;
  return (
    customDimensionValType === "string" || customDimensionValType === "number"
  );
}

/**
 * Used to bridge tracker data to native Google analytics.
 * Saves necessary tracker (specific) data to format data as native part of Google analytics expect.
 */
export default class GoogleAnalyticsTracker {
  id: string;
  customDimensionsFieldsIndexMap: CustomDimensionsFieldIndexMap;

  /**
   * Save all tracker related data that is needed to call native methods with proper data.
   * @param {String} trackerId 
   * @param {{fieldName: fieldIndex}} customDimensionsFieldsIndexMap Custom dimensions field/index pairs
   */
  constructor(
    trackerId: string,
    customDimensionsFieldsIndexMap?: CustomDimensionsFieldIndexMap
  ) {
    this.id = trackerId;
    this.customDimensionsFieldsIndexMap = customDimensionsFieldsIndexMap;
  }

  /**
   * If Tracker has customDimensionsFieldsIndexMap, it will transform
   * customDimensions map pairs {field: value} to {fieldIndex: value}.
   * Otherwise customDimensions are passed trough untouched.
   * Underlay native methods will transform provided customDimensions map to expected format.
   * Google analytics expect dimensions to be tracker with 'dimension{index}' keys,
   * not dimension field names.
   * @param {CustomDimensionsByIndex} customDimensions 
   * @returns {CustomDimensionsByField}
   */
  transformCustomDimensionsFieldsToIndexes(
    customDimensions: CustomDimensionsByIndex
  ): CustomDimensionsByField {
    if (this.customDimensionsFieldsIndexMap) {
      return Object.keys(this.customDimensionsFieldsIndexMap)
        .filter(key => isValidCustomDimension(customDimensions[key]))
        .reduce((mappedCustomDimensions, key) => {
          const dimensionIndex = this.customDimensionsFieldsIndexMap[key];
          mappedCustomDimensions[dimensionIndex] = customDimensions[key];
          return mappedCustomDimensions;
        }, {});
    }
    return customDimensions;
  }

  /**
   * Track the current screen/view
   * @param  {String} screenName The name of the current screen
   */
  trackScreenView(screenName: string): void {
    GoogleAnalyticsBridge.trackScreenView(this.id, screenName);
  }

  /**
   * Track the campaign from url
   * @param  {String} urlString The url of the deep link
   */
  trackCampaignFromUrl(urlString: string): void {
    GoogleAnalyticsBridge.trackCampaignFromUrl(this.id, urlString);
  }

  /**
   * Track an event that has occured
   * @param  {String} category       The event category
   * @param  {String} action         The event action
   * @param  {OptionalValue} optionalValues An object containing optional label and value
   */
  trackEvent(
    category: string,
    action: string,
    optionalValues?: OptionalValue
  ): void {
    GoogleAnalyticsBridge.trackEvent(this.id, category, action, optionalValues);
  }

  /**
   * Track the current screen/view with custom dimension values
   * @param  {String} screenName The name of the current screen
   * @param  {CustomDimensionsByIndex | CustomDimensionsByField} customDimensionValues An object containing custom dimension key/value pairs
   */
  trackScreenViewWithCustomDimensionValues(
    screenName: string,
    customDimensionValues: CustomDimensionsByIndex | CustomDimensionsByField
  ): void {
    const formattedCustomDimensions = this.transformCustomDimensionsFieldsToIndexes(
      customDimensionValues
    );
    GoogleAnalyticsBridge.trackScreenViewWithCustomDimensionValues(
      this.id,
      screenName,
      formattedCustomDimensions
    );
  }

  /**
   * Track an event that has occured with custom dimension values
   * @param  {String} category       The event category
   * @param  {String} action         The event action
   * @param  {OptionalValue} optionalValues An object containing optional label and value
   * @param  {CustomDimensionsByIndex | CustomDimensionsByField} customDimensionValues An object containing custom dimension key/value pairs
   */
  trackEventWithCustomDimensionValues(
    category: string,
    action: string,
    optionalValues?: OptionalValue,
    customDimensionValues?: CustomDimensionsByIndex | CustomDimensionsByField
  ): void {
    const formattedCustomDimensions = this.transformCustomDimensionsFieldsToIndexes(
      customDimensionValues
    );
    GoogleAnalyticsBridge.trackEventWithCustomDimensionValues(
      this.id,
      category,
      action,
      optionalValues,
      formattedCustomDimensions
    );
  }

  /**
   * Track an event that has occured with custom dimension and metric values.
   * @param  {String} category       The event category
   * @param  {String} action         The event action
   * @param  {OptionalValue} optionalValues An object containing optional label and value
   * @param  {CustomDimensionsByIndex | CustomDimensionsByField} customDimensionValues An object containing custom dimension key/value pairs
   * @param  {CustomMetrics} customMetricValues An object containing custom metric key/value pairs
   */
  trackEventWithCustomDimensionAndMetricValues(
    category: string,
    action: string,
    optionalValues?: OptionalValue,
    customDimensionValues?: CustomDimensionsByIndex | CustomDimensionsByField,
    customMetricValues?: CustomMetrics
  ): void {
    GoogleAnalyticsBridge.trackEventWithCustomDimensionAndMetricValues(
      this.id,
      category,
      action,
      optionalValues,
      customDimensionValues,
      customMetricValues
    );
  }

  /**
   * Track an event that has occured
   * @param  {String} category       The event category
   * @param  {Number} value         	The timing measurement in milliseconds
   * @param  {OptionalTimingValue} optionalValues An object containing optional name and label
   */
  trackTiming(
    category: string,
    value: number,
    optionalValues: OptionalTimingValue
  ): void {
    GoogleAnalyticsBridge.trackTiming(this.id, category, value, optionalValues);
  }

  /**
   * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
   * @param  {Product} product       An object with product values
   * @param  {Transaction} transaction   An object with transaction values
   * @param  {String} eventCategory The event category, defaults to Ecommerce
   * @param  {String} eventAction   The event action, defaults to Purchase
   */
  trackPurchaseEvent(
    product: Product,
    transaction: Transaction,
    eventCategory?: string,
    eventAction?: string
  ): void {
    GoogleAnalyticsBridge.trackPurchaseEvent(
      this.id,
      product,
      transaction,
      eventCategory,
      eventAction
    );
  }

  /**
   * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
   * @param  {Product[]} products       An array with products
   * @param  {Transaction} transaction   An object with transaction values
   * @param  {String} eventCategory The event category, defaults to Ecommerce
   * @param  {String} eventAction   The event action, defaults to Purchase
   */
  trackMultiProductsPurchaseEvent(
    products: Product[],
    transaction: Transaction,
    eventCategory?: string,
    eventAction?: string
  ): void {
    GoogleAnalyticsBridge.trackMultiProductsPurchaseEvent(
      this.id,
      products,
      transaction,
      eventCategory,
      eventAction
    );
  }

  /**
   * Track a purchase event with custom dimensions. This uses the Enhanced Ecommerce GA feature.
   * @param  {Product[]} products       An array with products
   * @param  {Transaction} transaction   An object with transaction values
   * @param  {String} eventCategory The event category, defaults to Ecommerce
   * @param  {String} eventAction   The event action, defaults to Purchase
   * @param  {CustomDimensionsByIndex | CustomDimensionsByField} customDimensionValues An object containing custom dimension key/value pairs
   */
  trackMultiProductsPurchaseEventWithCustomDimensionValues(
    products: Product[],
    transaction: Transaction,
    eventCategory?: string,
    eventAction?: string,
    customDimensions?: CustomDimensionsByIndex | CustomDimensionsByField
  ): void {
    const formattedCustomDimensions = this.transformCustomDimensionsFieldsToIndexes(
      customDimensions
    );
    GoogleAnalyticsBridge.trackMultiProductsPurchaseEventWithCustomDimensionValues(
      this.id,
      products,
      transaction,
      eventCategory,
      eventAction,
      formattedCustomDimensions
    );
  }

  /**
   * Track an exception
   * @param  {String} error The description of the error
   * @param  {Boolean} fatal A value indiciating if the error was fatal, defaults to false
   */
  trackException(error: string, fatal?: boolean): void {
    GoogleAnalyticsBridge.trackException(this.id, error, fatal);
  }

  /**
   * Sets the current userId for tracking.
   * @param {String} userId The current userId
   */
  setUser(userId: string): void {
    GoogleAnalyticsBridge.setUser(this.id, userId);
  }

  /**
   * Sets the current clientId for tracking.
   * @param {String} clientId The current userId
   */
  setClient(clientId: string): void {
    GoogleAnalyticsBridge.setClient(this.id, clientId);
  }

  /**
   * Sets if IDFA (identifier for advertisers) collection should be enabled
   * @param  {Boolean} enabled Defaults to true
   */
  allowIDFA(enabled: boolean): void {
    GoogleAnalyticsBridge.allowIDFA(this.id, enabled);
  }

  /**
   * Track a social interaction, Facebook, Twitter, etc.
   * @param  {String} network
   * @param  {String} action
   * @param  {String} targetUrl
   */
  trackSocialInteraction(
    network: string,
    action: string,
    targetUrl: string
  ): void {
    GoogleAnalyticsBridge.trackSocialInteraction(
      this.id,
      network,
      action,
      targetUrl
    );
  }

  /**
   * Sets if uncaught exceptions should be tracked
   * @param {Boolean} enabled
   */
  setTrackUncaughtExceptions(enabled: boolean): void {
    GoogleAnalyticsBridge.setTrackUncaughtExceptions(this.id, enabled);
  }

  /**
   * Sets the trackers appName
   * The Bundle name is used by default
   * @param {String} appName
   */
  setAppName(appName: string): void {
    GoogleAnalyticsBridge.setAppName(this.id, appName);
  }

  /**
   * Sets the trackers appVersion
   * @param {String} appVersion
   */
  setAppVersion(appVersion: string): void {
    GoogleAnalyticsBridge.setAppVersion(this.id, appVersion);
  }

  /**
   * Sets if AnonymizeIp is enabled
   * If enabled the last octet of the IP address will be removed
   * @param {Boolean} enabled
   */
  setAnonymizeIp(enabled: boolean): void {
    GoogleAnalyticsBridge.setAnonymizeIp(this.id, enabled);
  }

  /**
   * Sets tracker sampling rate.
   * @param {Float} sampleRatio Percentage 0 - 100
   */
  setSamplingRate(sampleRatio: number): void {
    GoogleAnalyticsBridge.setSamplingRate(this.id, sampleRatio);
  }

  /**
   * Sets the currency for tracking.
   * @param {String} currencyCode The currency ISO 4217 code
   */
  setCurrency(currencyCode: string): void {
    GoogleAnalyticsBridge.setCurrency(this.id, currencyCode);
  }

  /**
   * This function lets you create a session manually. By default, Google Analytics will group hits that are received 
   * within 30 minutes of one another into the same session. So it is strictly not necessary to create a session manually.
   * @param {String} screenName The current screen which the session started on
   */
  createNewSession(screenName: string): void {
    GoogleAnalyticsBridge.createNewSession(this.id, screenName);
  }
}
