import NativeBridges from "./NativeBridges";
const GoogleAnalyticsBridge = NativeBridges.GoogleAnalyticsBridge;

/**
 * Google analytics settings shared across all GoogleAnalyticsTracker instances.
 */
export default class GoogleAnalyticsSettings {
  /**
   * Sets if OptOut is active and disables Google Analytics
   * This has to be set each time the App starts
   * @param {Boolean} enabled
   */
  static setOptOut(enabled: boolean): void {
    GoogleAnalyticsBridge.setOptOut(enabled);
  }

  /**
   * Sets the trackers dispatch interval
   * This will influence how often batches of events, screen views, etc
   * are sent to your tracker.
   * @param {Number} intervalInSeconds
   */
  static setDispatchInterval(intervalInSeconds: number): void {
    GoogleAnalyticsBridge.setDispatchInterval(intervalInSeconds);
  }

  /**
   * Sets if the tracker should have dry run enabled.
   * If dry run is enabled, no analytics data will be sent to your tracker.
   * @param {Boolean} enabled
   */
  static setDryRun(enabled: boolean): void {
    GoogleAnalyticsBridge.setDryRun(enabled);
  }
}
