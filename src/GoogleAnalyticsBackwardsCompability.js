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
    this.tracker.trackScreenView(...arguments);
  }

  trackEvent(category, action, optionalValues = {}) {
    this.tracker.trackEvent(...arguments);
  }

  trackScreenViewWithCustomDimensionValues(screenName, customDimensionValues) {
    this.tracker.trackScreenViewWithCustomDimensionValues(...arguments);
  }

  trackEventWithCustomDimensionValues(category, action, optionalValues = {}, customDimensionValues) {
    this.tracker.trackEventWithCustomDimensionValues(...arguments);
  }

  trackTiming(category, value, optionalValues = {}) {
    this.tracker.trackTiming(...arguments);
  }

  trackPurchaseEvent(product = {}, transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    this.tracker.trackPurchaseEvent(...arguments);
  }

  trackMultiProductsPurchaseEvent(products = [], transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    this.tracker.trackMultiProductsPurchaseEvent(...arguments);
  }

  trackException(error, fatal = false) {
    this.tracker.trackException(...arguments);
  }

  setUser(userId) {
    this.tracker.setUser(...arguments);
  }

  allowIDFA(enabled = true) {
    this.tracker.allowIDFA(...arguments);
  }

  trackSocialInteraction(network, action, targetUrl) {
    this.tracker.trackSocialInteraction(...arguments);
  }

  setTrackUncaughtExceptions(enabled) {
    this.tracker.setTrackUncaughtExceptions(...arguments);
  }

  setAppName(appName) {
    this.tracker.setAppName(...arguments);
  }

  setAppVersion(appVersion) {
    this.tracker.setAppVersion(...arguments);
  }

  setAnonymizeIp(enabled) {
    this.tracker.setAnonymizeIp(...arguments);
  }

  setSamplingRate(sampleRatio) {
    this.tracker.setSamplingRate(...arguments);
  }
}
