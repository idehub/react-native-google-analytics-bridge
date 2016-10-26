import { GoogleAnalyticsBackwardsCompability } from './src/GoogleAnalyticsBackwardsCompability';
import { GoogleAnalyticsTracker } from './src/GoogleAnalyticsTracker';
import { GoogleAnalyticsSettings } from './src/GoogleAnalyticsSettings';
import { GoogleTagManager } from './src/GoogleTagManager';
import { GoogleAnalyticsBridge } from './src/NativeBridges';

export {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
  GoogleTagManager,
};

/**
 * Backwards compatibility default export.
 * Versions bellow 3.1.0 used static GoogleAnalytics class.
 * This exported instance makes sure older implementations work.
 */
export default new Proxy(new GoogleAnalyticsBackwardsCompability(GoogleAnalyticsBridge.nativeTrackerId), {
  get: (target, key) => {
    if (key in target) {
      return target[key];
    } else if (key in GATrackerPrototype) {
      const trackerProperty = target.tracker[key];
      if (_.isFunction(trackerProperty)) {
        return function (...args) {
          trackerProperty(...args);
        };
      }
      return trackerProperty[key];
    }
    return undefined;
  },
});
