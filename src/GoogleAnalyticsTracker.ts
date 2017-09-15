import { AnalyticsBridge, HitPayload } from "./NativeBridges";

import {
  CustomDimensionsByField,
  CustomDimensionsByIndex,
  CustomDimensionsFieldIndexMap
} from "./Custom";

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
  trackScreenView(screenName: string, payload: HitPayload = null): void {
    AnalyticsBridge.trackScreenView(this.id, screenName, payload);
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
    payload: HitPayload = null,
    label: string = null,
    value: number = null
  ): void {
    AnalyticsBridge.trackEvent(
      this.id,
      category,
      action,
      label,
      value,
      payload
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
    payload: HitPayload = null,
    name: string = null,
    label: string = null
  ): void {
    AnalyticsBridge.trackTiming(this.id, category, value, name, label, payload);
  }

  /**
   * Track an exception
   * @param  {String} error The description of the error
   * @param  {Boolean} fatal A value indiciating if the error was fatal, defaults to false
   */
  trackException(
    error: string,
    fatal: boolean = false,
    payload: HitPayload = null
  ): void {
    AnalyticsBridge.trackException(this.id, error, fatal, payload);
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
    targetUrl: string,
    payload: HitPayload
  ): void {
    AnalyticsBridge.trackSocialInteraction(
      this.id,
      network,
      action,
      targetUrl,
      payload
    );
  }

  /**
   * Sets the current userId for tracking.
   * @param {String} userId The current userId
   */
  setUser(userId: string): void {
    AnalyticsBridge.setUser(this.id, userId);
  }

  /**
   * Sets the current clientId for tracking.
   * @param {String} clientId The current userId
   */
  setClient(clientId: string): void {
    AnalyticsBridge.setClient(this.id, clientId);
  }

  /**
   * Sets if IDFA (identifier for advertisers) collection should be enabled
   * @param  {Boolean} enabled Defaults to true
   */
  allowIDFA(enabled: boolean): void {
    AnalyticsBridge.allowIDFA(this.id, enabled);
  }

  /**
   * Sets the trackers appName
   * The Bundle name is used by default
   * @param {String} appName
   */
  setAppName(appName: string): void {
    AnalyticsBridge.setAppName(this.id, appName);
  }

  /**
   * Sets the trackers appVersion
   * @param {String} appVersion
   */
  setAppVersion(appVersion: string): void {
    AnalyticsBridge.setAppVersion(this.id, appVersion);
  }

  /**
   * Sets if AnonymizeIp is enabled
   * If enabled the last octet of the IP address will be removed
   * @param {Boolean} enabled
   */
  setAnonymizeIp(enabled: boolean): void {
    AnalyticsBridge.setAnonymizeIp(this.id, enabled);
  }

  /**
   * Sets tracker sampling rate.
   * @param {Float} sampleRatio Percentage 0 - 100
   */
  setSamplingRate(sampleRatio: number): void {
    AnalyticsBridge.setSamplingRate(this.id, sampleRatio);
  }

  /**
   * Sets the currency for tracking.
   * @param {String} currencyCode The currency ISO 4217 code
   */
  setCurrency(currencyCode: string): void {
    AnalyticsBridge.setCurrency(this.id, currencyCode);
  }

  /**
   * Sets if uncaught exceptions should be tracked
   * Important to note: On iOS this option is set on all trackers. On Android it is set per tracker.
   * If you are using multiple trackers on iOS, this will enable & disable on all trackers.
   * @param {Boolean} enabled
   */
  setTrackUncaughtExceptions(enabled: boolean): void {
    AnalyticsBridge.setTrackUncaughtExceptions(this.id, enabled);
  }
}
