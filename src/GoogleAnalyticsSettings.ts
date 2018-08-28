import { AnalyticsSettings } from "./NativeBridges";

/**
 * Settings which are applied across all trackers.
 * @name GoogleAnalyticsSettings
 */
class GoogleAnalyticsSettings {
  /**
   * Sets if OptOut is active and disables Google Analytics. This is disabled by default. Note: This has to be set each time the App starts.
   * @example GoogleAnalyticsSettings.setOptOut(true);
   * @param {boolean} enabled
   */
  static setOptOut(enabled: boolean): void {
    AnalyticsSettings.setOptOut(enabled);
  }

  /**
   * Sets the trackers dispatch interval.
   * Events, screen views, etc, are sent in batches to your tracker. This function allows you to configure how often (in seconds) the batches are sent to your tracker. Recommended to keep this around 20-120 seconds to preserve battery and network traffic. This is set to 20 seconds by default.
   * @example GoogleAnalyticsSettings.setDispatchInterval(30);
   * @param {number} intervalInSeconds
   */
  static setDispatchInterval(intervalInSeconds: number): void {
    AnalyticsSettings.setDispatchInterval(intervalInSeconds);
  }

  /**
   * When enabled the native library prevents any data from being sent to Google Analytics. This allows you to test or debug the implementation, without your test data appearing in your Google Analytics reports.
   * @example GoogleAnalyticsSettings.setDryRun(true);
   * @param {boolean} enabled
   */
  static setDryRun(enabled: boolean): void {
    AnalyticsSettings.setDryRun(enabled);
  }
}

export default GoogleAnalyticsSettings;
