import { AnalyticsBridge } from "./NativeBridges";
import { HitPayload, EventMetadata, TimingMetadata } from "./models/Analytics";

import {
  CustomDimensionsByField,
  CustomDimensionsByIndex,
  CustomDimensionsFieldIndexMap
} from "./models/Custom";

const DEFAULT_DISPATCH_TIMEOUT = 15000;

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
 * @name GoogleAnalyticsTracker
 * @example
 * // Constructing a tracker is simple:
 * import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
 * const tracker = new GoogleAnalyticsTracker("UA-12345-1");
 * tracker.trackScreenView("Home");
 *
 * // You can have multiple trackers if you have several tracking ids
 * const tracker2 = new GoogleAnalyticsTracker("UA-12345-2");
 * @example
 * // One optional feature as well is constructing a tracker with a CustomDimensionsFieldIndexMap, to map custom dimension field names to index keys:
 * const fieldIndexMap = { customerType: 1 };
 * const tracker3 = new GoogleAnalyticsTracker("UA-12345-3", fieldIndexMap);
 *
 * // This is because the Google Analytics API expects custom dimensions to be tracked by index keys, and not field names.
 * // Here the underlying logic will transform the custom dimension, so what ends up being sent to GA is { 1: 'Premium' }:
 * tracker3.trackScreenView("Home", { customDimensions: { customerType: "Premium" } });
 *
 * // If you do not use a CustomDimensionsFieldIndexMap, you will have to use index as keys instead for custom dimensions:
 * tracker.trackScreenView("Home", { customDimensions: { 1: "Premium" } });
 */
class GoogleAnalyticsTracker {
  id: string;
  customDimensionsFieldsIndexMap: CustomDimensionsFieldIndexMap;

  /**
   * Save all tracker related data that is needed to call native methods with proper data.
   * @param {string} trackerId Your tracker id, something like: UA-12345-1
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

  private transformPayload(payload: HitPayload) {
    if (payload && payload.customDimensions) {
      let customDimensions = payload.customDimensions;
      let transformed = this.transformCustomDimensionsFieldsToIndexes(
        customDimensions
      );
      payload.customDimensions = transformed;
    }
  }

  /**
   * Track the current screen/view. Calling this will also set the "current view" for other calls.
   *  So events tracked will be tagged as having occured on the current view, `Home` in this example.
   * This means it is important to track navigation, especially if events can fire on different views.
   * @example
   * tracker.trackScreenView('Home');
   * @example
   * // With payload:
   * const payload = { impressionList: "Sale", impressionProducts: [ { id: "PW928", name: "Premium bundle" } ] };
   * tracker.trackScreenView("SplashModal", payload);
   * @param  {string} screenName (Required) The name of the current screen
   * @param  {HitPayload} payload (Optional) An object containing the hit payload
   */
  trackScreenView(screenName: string, payload: HitPayload = null): void {
    this.transformPayload(payload);
    AnalyticsBridge.trackScreenView(this.id, screenName, payload);
  }

  /**
   * Track an event that has occured
   * @example
   * tracker.trackEvent("DetailsButton", "Click");
   * @example
   * // Track event with label and value
   * tracker.trackEvent("AppVersionButton", "Click", { label: "v1.0.3", value: 22 });
   * @example
   * // Track with a payload (ecommerce in this case):
   * const product = {
   *   id: "P12345",
   *   name: "Android Warhol T-Shirt",
   *   category: "Apparel/T-Shirts",
   *   brand: "Google",
   *   variant: "Black",
   *   price: 29.2,
   *   quantity: 1,
   *   couponCode: "APPARELSALE"
   * };
   * const transaction = {
   *   id: "T12345",
   *   affiliation: "Google Store - Online",
   *   revenue: 37.39,
   *   tax: 2.85,
   *   shipping: 5.34,
   *   couponCode: "SUMMER2013"
   * };
   * const productAction = {
   *   transaction,
   *   action: 7 // Purchase action, see ProductActionEnum
   * }
   * const payload = { products: [ product ], productAction: productAction }
   * tracker.trackEvent("FinalizeOrderButton", "Click", null, payload);
   * @param  {string} category (Required) The event category
   * @param  {string} action (Required) The event action
   * @param  {EventMetadata} eventMetadata (Optional) An object containing event metadata
   * @param  {HitPayload} payload (Optional) An object containing the hit payload
   */
  trackEvent(
    category: string,
    action: string,
    eventMetadata?: EventMetadata,
    payload: HitPayload = null
  ): void {
    this.transformPayload(payload);
    AnalyticsBridge.trackEvent(
      this.id,
      category,
      action,
      (eventMetadata && eventMetadata.label ? eventMetadata.label : null),
      (eventMetadata && eventMetadata.value != null ? eventMetadata.value.toString() : null),
      payload
    );
  }

  /**
   * Track a timing measurement
   * @example
   * tracker.trackTiming("testcategory", 2000, { name: "LoadList" }); // name metadata is required
   * @example
   * // With optional label:
   * tracker.trackTiming("testcategory", 2000, { name: "LoadList", label: "v1.0.3" });
   * @example
   * @param  {string} category (Required) The event category
   * @param  {number} interval (Required) The timing measurement in milliseconds
   * @param  {TimingMetadata} timingMetadata (Required) An object containing timing metadata
   * @param  {HitPayload} payload (Optional) An object containing the hit payload
   */
  trackTiming(
    category: string,
    interval: number,
    timingMetadata: TimingMetadata,
    payload: HitPayload = null
  ): void {
    this.transformPayload(payload);
    AnalyticsBridge.trackTiming(
      this.id,
      category,
      interval,
      timingMetadata.name,
      timingMetadata.label,
      payload
    );
  }

  /**
   * Track an exception
   * @example
   * try {
   *   ...
   * } catch(error) {
   *   tracker.trackException(error.message, false);
   * }
   * @param  {string} error (Required) The description of the error
   * @param  {boolean} fatal (Optional) A value indiciating if the error was fatal, defaults to false
   * @param  {HitPayload} payload (Optional) An object containing the hit payload
   */
  trackException(
    error: string,
    fatal: boolean = false,
    payload: HitPayload = null
  ): void {
    this.transformPayload(payload);
    AnalyticsBridge.trackException(this.id, error, fatal, payload);
  }

  /**
   * Track a social interaction, Facebook, Twitter, etc.
   * @example tracker.trackSocialInteraction("Twitter", "Post");
   * @param  {string} network
   * @param  {string} action
   * @param  {string} targetUrl
   * @param  {HitPayload} payload (Optional) An object containing the hit payload
   */
  trackSocialInteraction(
    network: string,
    action: string,
    targetUrl: string,
    payload: HitPayload
  ): void {
    this.transformPayload(payload);
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
   * @example tracker.setUser("12345678");
   * @param {string} userId An anonymous identifier that complies with Google Analytic's user ID policy
   */
  setUser(userId: string): void {
    AnalyticsBridge.setUser(this.id, userId);
  }

  /**
   * Sets the current clientId for tracking.
   * @example tracker.setClient("35009a79-1a05-49d7-b876-2b884d0f825b");
   * @param {string} clientId A anonymous identifier that complies with Google Analytic's client ID policy
   */
  setClient(clientId: string): void {
    AnalyticsBridge.setClient(this.id, clientId);
  }

  /**
   * Get the client id to be used for purpose of logging etc.
   * @example tracker.getClientId().then(clientId => console.log("Client id is: ", clientId));
   * @returns {Promise<string>}
   */
  getClientId(): Promise<string> {
    return AnalyticsBridge.getClientId(this.id);
  }

  /**
   * Also called advertising identifier collection, and is used for advertising features.
   *
   * **Important**: For iOS you can only use this method if you have done the optional step 6 from the installation guide. Only enable this (and link the appropriate libraries) if you plan to use advertising features in your app, or else your app may get rejected from the AppStore.
   * @example tracker.allowIDFA(true);
   * @param {boolean} enabled (Optional) Defaults to true
   */
  allowIDFA(enabled: boolean = true): void {
    AnalyticsBridge.allowIDFA(this.id, enabled);
  }

  /**
   * Overrides the app name logged in Google Analytics. The Bundle name is used by default. Note: This has to be set each time the App starts.
   * @example tracker.setAppName("YourAwesomeApp");
   * @param {string} appName (Required)
   */
  setAppName(appName: string): void {
    AnalyticsBridge.setAppName(this.id, appName);
  }

  /**
   * Sets the trackers appVersion
   * @example tracker.setAppVersion("1.3.2");
   * @param {string} appVersion (Required)
   */
  setAppVersion(appVersion: string): void {
    AnalyticsBridge.setAppVersion(this.id, appVersion);
  }

  /**
   * Sets if AnonymizeIp is enabled
   * If enabled the last octet of the IP address will be removed
   * @example tracker.setAnonymizeIp(true);
   * @param {boolean} enabled (Required)
   */
  setAnonymizeIp(enabled: boolean): void {
    AnalyticsBridge.setAnonymizeIp(this.id, enabled);
  }

  /**
   * Sets tracker sampling rate.
   * @example tracker.setSamplingRate(50);
   * @param {number} sampleRatio (Required) Percentage 0 - 100
   */
  setSamplingRate(sampleRatio: number): void {
    AnalyticsBridge.setSamplingRate(this.id, sampleRatio);
  }

  /**
   * Sets the currency for tracking.
   * @example tracker.setCurrency("EUR");
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

  /**
   * This function lets you manually dispatch all hits which are queued.
   * Use this function sparingly, as it will normally happen automatically
   * as a batch. This function will also dispatch for all trackers.
   * @example tracker.dispatch().then(done => console.log("Dispatch is done: ", done));
   * @returns {Promise<boolean>} Returns when done
   */
  dispatch(): Promise<boolean> {
    return AnalyticsBridge.dispatch();
  }

  /**
   * The same as `dispatch`, but also gives you the ability to time out
   * the Promise in case dispatch takes too long.
   * @example
   * tracker
   *   .dispatchWithTimeout(10000)
   *   .then(done => console.log("Dispatch is done: ", done));
   * @param {number} timeout The timeout. Default value is 15 sec.
   * @returns {Promise<boolean>} Returns when done or timed out
   */
  dispatchWithTimeout(timeout = -1): Promise<boolean> {
    if (timeout < 0) {
      return AnalyticsBridge.dispatch();
    }

    let timer = null;

    const withTimeout = (timeout: number): Promise<boolean> =>
      new Promise<boolean>(resolve => {
        timer = setTimeout(() => {
          timer = null;
          resolve(false);
        }, Math.min(timeout, DEFAULT_DISPATCH_TIMEOUT));
      });

    return Promise.race([
      AnalyticsBridge.dispatch(),
      withTimeout(timeout)
    ]).then(result => {
      if (timer) {
        clearTimeout(timer);
      }
      return result;
    });
  }
}

export default GoogleAnalyticsTracker;
