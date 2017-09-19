import { AnalyticsBridge } from "./NativeBridges";
import { HitPayload } from "./HitPayload";

import {
  CustomDimensionsByField,
  CustomDimensionsByIndex,
  CustomDimensionsFieldIndexMap
} from "./Custom";

/**
 * Custom dimensions accept only strings and numbers.
 * @ignore
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
 * @typicalname tracker
 */
class GoogleAnalyticsTracker {
  id: string;
  customDimensionsFieldsIndexMap: CustomDimensionsFieldIndexMap;

  /**
   * Save all tracker related data that is needed to call native methods with proper data.
   * @param {string} trackerId Your tracker id, something like: UA-12345-1
   * @param {{fieldName: fieldIndex}} customDimensionsFieldsIndexMap Custom dimensions field/index pairs
   * @example
   * ```js
   * import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
   * let tracker = new GoogleAnalyticsTracker('UA-12345-1');
   * ```
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
   * @ignore
   * @param {{fieldName: value}} customDimensions 
   * @returns {{fieldIndex: value}}
   */
  private transformCustomDimensionsFieldsToIndexes(
    customDimensions: CustomDimensionsByField | CustomDimensionsByIndex
  ): CustomDimensionsByField | CustomDimensionsByIndex {
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
   * @example
   * ```js
   * tracker.trackScreenView('Home')
   * ```
   * Track the current screen/view. Calling this will also set the "current view" for other calls.
   *  So events tracked will be tagged as having occured on the current view, `Home` in this example. 
   * This means it is important to track navigation, especially if events can fire on different views.
   * @param  {string} screenName (Required) The name of the current screen
   * @param  {Object} payload (Optional) An object containing the hit payload
   */
  trackScreenView(screenName: string, payload: HitPayload = null): void {
    AnalyticsBridge.trackScreenView(this.id, screenName, payload);
  }

  /**
   * Track an event that has occured
   * @param  {string} category (Required) The event category
   * @param  {string} action (Required) The event action
   * @param  {Object} payload (Optional) An object containing the hit payload
   * @param  {string} label (Optional) An optional event label
   * @param  {number} value (Optional) An optional event value
   */
  trackEvent(
    category: string,
    action: string,
    payload: HitPayload = null,
    label: string = null,
    value: number = null
  ): void {
    if (payload) {
      let customDimensions = payload.customDimensions;
      let transformed = this.transformCustomDimensionsFieldsToIndexes(
        customDimensions
      );
      payload.customDimensions = transformed;
    }
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
   * @param  {string} category (Required) The event category
   * @param  {number} interval (Required) The timing measurement in milliseconds
   * @param  {Object} payload (Optional) An object containing the hit payload
   * @param  {string} name (Required) The timing name
   * @param  {string} label (Optional) An optional timing label
   */
  trackTiming(
    category: string,
    interval: number,
    payload: HitPayload = null,
    name: string = null,
    label: string = null
  ): void {
    AnalyticsBridge.trackTiming(
      this.id,
      category,
      interval,
      name,
      label,
      payload
    );
  }

  /**
   * Track an exception
   * @param  {string} error (Required) The description of the error
   * @param  {boolean} fatal (Optional) A value indiciating if the error was fatal, defaults to false
   * @param  {Object} payload (Optional) An object containing the hit payload
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
   * @param  {string} network
   * @param  {string} action
   * @param  {string} targetUrl
   * @param  {Object} payload (Optional) An object containing the hit payload
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
   * @param {string} userId The current userId
   */
  setUser(userId: string): void {
    AnalyticsBridge.setUser(this.id, userId);
  }

  /**
   * Sets the current clientId for tracking.
   * @param {string} clientId The current userId
   */
  setClient(clientId: string): void {
    AnalyticsBridge.setClient(this.id, clientId);
  }

  /**
   * Sets if IDFA (identifier for advertisers) collection should be enabled
   * @param  {boolean} enabled (Optional) Defaults to true
   */
  allowIDFA(enabled: boolean = true): void {
    AnalyticsBridge.allowIDFA(this.id, enabled);
  }

  /**
   * Sets the trackers appName
   * The Bundle name is used by default
   * @param {string} appName (Required)
   */
  setAppName(appName: string): void {
    AnalyticsBridge.setAppName(this.id, appName);
  }

  /**
   * Sets the trackers appVersion
   * @param {string} appVersion (Required)
   */
  setAppVersion(appVersion: string): void {
    AnalyticsBridge.setAppVersion(this.id, appVersion);
  }

  /**
   * Sets if AnonymizeIp is enabled
   * If enabled the last octet of the IP address will be removed
   * @param {boolean} enabled (Required)
   */
  setAnonymizeIp(enabled: boolean): void {
    AnalyticsBridge.setAnonymizeIp(this.id, enabled);
  }

  /**
   * Sets tracker sampling rate.
   * @param {number} sampleRatio (Required) Percentage 0 - 100
   */
  setSamplingRate(sampleRatio: number): void {
    AnalyticsBridge.setSamplingRate(this.id, sampleRatio);
  }

  /**
   * Sets the currency for tracking.
   * @param {string} currencyCode (Required) The currency ISO 4217 code
   */
  setCurrency(currencyCode: string): void {
    AnalyticsBridge.setCurrency(this.id, currencyCode);
  }

  /**
   * Sets if uncaught exceptions should be tracked
   * Important to note: On iOS this option is set on all trackers. On Android it is set per tracker.
   * If you are using multiple trackers on iOS, this will enable & disable on all trackers.
   * @param {boolean} enabled
   */
  setTrackUncaughtExceptions(enabled: boolean): void {
    AnalyticsBridge.setTrackUncaughtExceptions(this.id, enabled);
  }
}

export default GoogleAnalyticsTracker;
