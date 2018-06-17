import { AnalyticsSettings } from "./NativeBridges";

/**
 * @name GoogleAnalyticsSettings
 */
class GoogleAnalyticsSettings {
  /**
   * Sets if OptOut is active and disables Google Analytics
   * This has to be set each time the App starts
   * @param {boolean} enabled
   */
  static setOptOut(enabled: boolean): void {
    AnalyticsSettings.setOptOut(enabled);
  }

  /**
   * Sets the trackers dispatch interval
   * This will influence how often batches of events, screen views, etc
   * are sent to your tracker.
   * @param {number} intervalInSeconds
   */
  static setDispatchInterval(intervalInSeconds: number): void {
    AnalyticsSettings.setDispatchInterval(intervalInSeconds);
  }

  /**
   * Sets if the tracker should have dry run enabled.
   * If dry run is enabled, no analytics data will be sent to your tracker.
   * @param {boolean} enabled
   */
  static setDryRun(enabled: boolean): void {
    AnalyticsSettings.setDryRun(enabled);
  }
}

export default GoogleAnalyticsSettings;
