import { GoogleTagManager } from './GoogleTagManager';
import { GoogleAnalyticsSettings } from './GoogleAnalyticsSettings';
import { GoogleAnalyticsTracker } from './GoogleAnalyticsTracker';

function createNewTracker(trackerId, customDimensionsKeysIndexMap) {
  return trackerId && new GoogleAnalyticsTracker(trackerId, customDimensionsKeysIndexMap);
}

/**
 * Backwards compatibility for static implementation
 */
export class GoogleAnalyticsBackwardsCompability {
  // GoogleTagManager was static property of GoogleAnalytics class in previous version.
  static GoogleTagManager = GoogleTagManager;

  constructor(trackerId, customDimensionsKeysIndexMap) {
    this.tracker = createNewTracker(trackerId, customDimensionsKeysIndexMap);
  }

  /**
   * Versions below 3.1.0 had singleton that could "lazily" set trackerId.
   * @param trackerId
   */
  setTrackerId(trackerId, customDimensionsKeysIndexMap) {
    this.tracker = createNewTracker(trackerId, customDimensionsKeysIndexMap);
  }

  // Proxying previously static methods to Settings

  setDryRun(enabled) {
    GoogleAnalyticsSettings.setDryRun(enabled);
  }

  setDispatchInterval(intervalInSeconds) {
    GoogleAnalyticsSettings.setDispatchInterval(intervalInSeconds);
  }

  setOptOut(enabled) {
    GoogleAnalyticsSettings.setOptOut(enabled);
  }

  // Proxying previously static methods to Tracker

  trackScreenView(screenName) {
    this.tracker.trackScreenView(screenName);
  }

  trackEvent(category, action, optionalValues = {}) {
    this.tracker.trackEvent(category, action, optionalValues);
  }

  trackScreenViewWithCustomDimensionValues(screenName, customDimensionValues) {
    this.tracker.trackScreenViewWithCustomDimensionValues(screenName, customDimensionValues);
  }

  trackEventWithCustomDimensionValues(category, action, optionalValues = {}, customDimensionValues) {
    this.tracker.trackEventWithCustomDimensionValues(category, action, optionalValues, customDimensionValues);
  }

  trackTiming(category, value, optionalValues = {}) {
    this.tracker.trackTiming(category, value, optionalValues);
  }

  trackPurchaseEvent(product = {}, transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    this.tracker.trackPurchaseEvent(product, transaction, eventCategory, eventAction);
  }

  trackMultiProductsPurchaseEvent(products = [], transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    this.tracker.trackMultiProductsPurchaseEvent(products, transaction, eventCategory, eventAction);
  }

  trackMultiProductsPurchaseEventWithCustomDimensionValues(products = [], transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase", customDimensionValues) {
    this.tracker.trackMultiProductsPurchaseEventWithCustomDimensionValues(products, transaction, eventCategory, eventAction, customDimensionValues);
  }

  trackException(error, fatal = false) {
    this.tracker.trackException(error, fatal);
  }

  setUser(userId) {
    this.tracker.setUser(userId);
  }

  allowIDFA(enabled = true) {
    this.tracker.allowIDFA(enabled);
  }

  trackSocialInteraction(network, action, targetUrl) {
    this.tracker.trackSocialInteraction(network, action, targetUrl);
  }

  setTrackUncaughtExceptions(enabled) {
    this.tracker.setTrackUncaughtExceptions(enabled);
  }

  setAppName(appName) {
    this.tracker.setAppName(appName);
  }

  setAppVersion(appVersion) {
    this.tracker.setAppVersion(appVersion);
  }

  setAnonymizeIp(enabled) {
    this.tracker.setAnonymizeIp(enabled);
  }

  setSamplingRate(sampleRatio) {
    this.tracker.setSamplingRate(sampleRatio);
  }

  setCurrency(currencyCode) {
    this.tracker.setCurrency(currencyCode);
  }

  createNewSession(screenName) {
    this.tracker.createNewSession(screenName);
  }
}
