import { GoogleTagManager } from './GoogleTagManager';
import { GoogleAnalyticsSettings } from './GoogleAnalyticsSettings';
import { GoogleAnalyticsTracker } from './GoogleAnalyticsTracker';

function createNewTracker(trackerId) {
  return trackerId && new GoogleAnalyticsTracker(trackerId);
}

export class GoogleAnalyticsBackwardsCompability {
  // GoogleTagManager was static property of GoogleAnalytics class in previous version.
  static GoogleTagManager = GoogleTagManager;

  constructor(trackerId) {
    this.tracker = createNewTracker(trackerId);
  }

  /**
   * Backwards compatibility method.
   * Versions below 3.1.0 had singleton that could get trackerId from JS.
   * @param trackerId
   */
  setTrackerId(trackerId) {
    this.tracker = createNewTracker(trackerId);
  }

  /**
   * Backwards compatibility for Single instance.
   * Proxy to static method.
   * @param enabled
   */
  setDryRun(enabled) {
    GoogleAnalyticsSettings.setDryRun(enabled);
  }

  /**
   * Backwards compatibility for Single instance.
   * Proxy to static method.
   * @param intervalInSeconds
   */
  setDispatchInterval(intervalInSeconds) {
    GoogleAnalyticsSettings.setDispatchInterval(intervalInSeconds);
  }

  /**
   * Backwards compatibility for Single instance.
   * Proxy to static method.
   * @param enabled
   */
  setOptOut(enabled) {
    GoogleAnalyticsSettings.setOptOut(enabled);
  }
}
