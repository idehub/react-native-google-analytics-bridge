import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

const tracker = new GoogleAnalyticsTracker("trackerId");

// $ExpectType void
tracker.trackScreenView("Home");

// $ExpectType void
tracker.trackEvent("MyEvent", "MyAction");

// $ExpectType Promise<boolean>
tracker.dispatch();

// $ExpectType void
GoogleAnalyticsSettings.setDispatchInterval(30);

// $ExpectType void
GoogleAnalyticsSettings.setDryRun(false);

// $ExpectType void
GoogleAnalyticsSettings.setOptOut(false);

// $ExpectType Promise<boolean>
GoogleTagManager.openContainerWithId("containerId");

// $ExpectType Promise<number>
GoogleTagManager.doubleForKey("someKey");

// $ExpectType Promise<boolean>
GoogleTagManager.boolForKey("someKey");

// $ExpectType Promise<string>
GoogleTagManager.stringForKey("someKey");

// $ExpectType Promise<boolean>
GoogleTagManager.setVerboseLoggingEnabled(true);

// $ExpectType Promise<boolean>
GoogleTagManager.pushDataLayerEvent({
  event: "myEvent",
  someKey: "myKey",
  metadata: {
    id: 1200
  }
});
