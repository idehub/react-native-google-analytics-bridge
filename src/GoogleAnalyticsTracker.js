import { GoogleAnalyticsBridge } from './NativeBridges';

/**
 * Used to bridge tracker data to native Google analytics.
 * Saves necessary tracker (specific) data to format data as native part of Google analytics expect.
 */
export class GoogleAnalyticsTracker {
  /**
   * Save all tracker related data that is needed to call native methods with proper data.
   * @param trackerId {String}
   * @param customDimensionsFieldsIndexMap {{fieldName: fieldIndex}} Custom dimensions field/index pairs
   */
  constructor(trackerId, customDimensionsFieldsIndexMap) {
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
   * @param customDimensions {Object}
   * @returns {Object}
   */
  transformCustomDimensionsFieldsToIndexes(customDimensions) {
    if (this.customDimensionsFieldsIndexMap) {
      const mappedCustomDimensions = {};
      Object.keys(this.customDimensionsFieldsIndexMap).forEach(key => {
        const dimensionIndex = this.customDimensionsFieldsIndexMap[key];
        if (customDimensions[key]) {
          mappedCustomDimensions[dimensionIndex] = customDimensions[key];
        }
      });
      return mappedCustomDimensions;
    }
    return customDimensions;
  }

  /**
   * Track the current screen/view
   * @param  {String} screenName The name of the current screen
   */
  trackScreenView(screenName) {
    GoogleAnalyticsBridge.trackScreenView(this.id, ...arguments);
  }

  /**
   * Track an event that has occured
   * @param  {String} category       The event category
   * @param  {String} action         The event action
   * @param  {Object} optionalValues An object containing optional label and value
   */
  trackEvent(category, action, optionalValues = {}) {
    GoogleAnalyticsBridge.trackEvent(this.id, ...arguments);
  }

  /**
   * Track the current screen/view with custom dimension values
   * @param  {String} screenName The name of the current screen
   * @param  {Object} customDimensionValues An object containing custom dimension key/value pairs
   */
  trackScreenViewWithCustomDimensionValues(screenName, customDimensionValues) {
    const formattedCustomDimensions = this.transformCustomDimensionsFieldsToIndexes(customDimensionValues);
    GoogleAnalyticsBridge.trackScreenViewWithCustomDimensionValues(this.id, screenName, formattedCustomDimensions);
  }

  /**
   * Track an event that has occured with custom dimension values
   * @param  {String} category       The event category
   * @param  {String} action         The event action
   * @param  {Object} optionalValues An object containing optional label and value
   * @param  {Object} customDimensionValues An object containing custom dimension key/value pairs
   */
  trackEventWithCustomDimensionValues(category, action, optionalValues = {}, customDimensionValues) {
    const formattedCustomDimensions = this.transformCustomDimensionsFieldsToIndexes(customDimensionValues);
    GoogleAnalyticsBridge.trackEventWithCustomDimensionValues(this.id, category, action, optionalValues, formattedCustomDimensions);
  }

  /**
   * Track an event that has occured
   * @param  {String} category       The event category
   * @param  {Number} value         	The timing measurement in milliseconds
   * @param  {Object} optionalValues An object containing optional name and label
   */
  trackTiming(category, value, optionalValues = {}) {
    GoogleAnalyticsBridge.trackTiming(this.id, ...arguments);
  }

  /**
   * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
   * @param  {Object} product       An object with product values
   * @param  {Object} transaction   An object with transaction values
   * @param  {String} eventCategory The event category, defaults to Ecommerce
   * @param  {String} eventAction   The event action, defaults to Purchase
   */
  trackPurchaseEvent(product = {}, transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    GoogleAnalyticsBridge.trackPurchaseEvent(this.id, ...arguments);
  }

  /**
   * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
   * @param  {Array} products       An array with products
   * @param  {Object} transaction   An object with transaction values
   * @param  {String} eventCategory The event category, defaults to Ecommerce
   * @param  {String} eventAction   The event action, defaults to Purchase
   */
  trackMultiProductsPurchaseEvent(products = [], transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    GoogleAnalyticsBridge.trackMultiProductsPurchaseEvent(this.id, ...arguments);
  }

  /**
   * Track an exception
   * @param  {String} error The description of the error
   * @param  {Boolean} fatal A value indiciating if the error was fatal, defaults to false
   */
  trackException(error, fatal = false) {
    GoogleAnalyticsBridge.trackException(this.id, ...arguments);
  }

  /**
   * Sets the current userId for tracking.
   * @param {String} userId The current userId
   */
  setUser(userId) {
    GoogleAnalyticsBridge.setUser(this.id, ...arguments);
  }

  /**
   * Sets if IDFA (identifier for advertisers) collection should be enabled
   * @param  {Boolean} enabled Defaults to true
   */
  allowIDFA(enabled = true) {
    GoogleAnalyticsBridge.allowIDFA(this.id, ...arguments);
  }

  /**
   * Track a social interaction, Facebook, Twitter, etc.
   * @param  {String} network
   * @param  {String} action
   * @param  {String} targetUrl
   */
  trackSocialInteraction(network, action, targetUrl) {
    GoogleAnalyticsBridge.trackSocialInteraction(this.id, ...arguments);
  }

  /**
   * Sets if uncaught exceptions should be tracked
   * @param {Boolean} enabled
   */
  setTrackUncaughtExceptions(enabled) {
    GoogleAnalyticsBridge.setTrackUncaughtExceptions(this.id, ...arguments);
  }

  /**
   * Sets the trackers appName
   * The Bundle name is used by default
   * @param {String} appName
   */
  setAppName(appName) {
    GoogleAnalyticsBridge.setAppName(this.id, ...arguments);
  }

  /**
   * Sets the trackers appVersion
   * @param {String} appVersion
   */
  setAppVersion(appVersion) {
    GoogleAnalyticsBridge.setAppVersion(this.id, ...arguments);
  }

  /**
   * Sets if AnonymizeIp is enabled
   * If enabled the last octet of the IP address will be removed
   * @param {Boolean} enabled
   */
  setAnonymizeIp(enabled) {
    GoogleAnalyticsBridge.setAnonymizeIp(this.id, ...arguments);
  }

  /**
   * Sets tracker sampling rate.
   * @param {Float} sampleRatio Percentage 0 - 100
   */
  setSamplingRate(sampleRatio) {
    GoogleAnalyticsBridge.setSamplingRate(this.id, ...arguments);
  }
}
