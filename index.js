import { GoogleAnalytics } from './src/GoogleAnalytics';
import { GoogleAnalyticsSettings } from './src/GoogleAnalyticsSettings';
import { GoogleTagManager } from './src/GoogleTagManager';
import { GoogleAnalyticsBridge } from './src/NativeBridges';

export {
  GoogleAnalytics,
  GoogleAnalyticsSettings,
  GoogleTagManager,
};

/**
 * Backwards compatibility default export.
 * Versions bellow 3.1.0 used static GoogleAnalytics class.
 * This exported instance makes sure older implementations work.
 */
export default new GoogleAnalytics(GoogleAnalyticsBridge.nativeTrackerId);
