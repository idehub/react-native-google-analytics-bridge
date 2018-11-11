import { HitPayload } from "./models/Analytics";
import { NativeModules, EventSubscriptionVendor } from "react-native";
import DataLayerEvent from "./models/DataLayerEvent";
const {
  GoogleTagManagerBridge,
  GoogleAnalyticsBridge,
  GoogleAnalyticsSettings
} = NativeModules;

if (
  !GoogleTagManagerBridge ||
  !GoogleAnalyticsBridge ||
  !GoogleAnalyticsSettings
) {
  console.error(
    "Something went wrong initializing the native react-native-google-analytics-bridge module.\nPlease check your configuration.\nDid you forget to run 'react-native link' or install your node_modules?"
  );
}

export interface IGoogleAnalyticsBridge {
  trackScreenView(
    trackerId: string,
    screenName: string,
    payload: HitPayload
  ): void;
  trackEvent(
    trackerId: string,
    category: string,
    action: string,
    label: string,
    value: string,
    payload: HitPayload
  ): void;
  trackTiming(
    trackerId: string,
    category: string,
    interval: number,
    name: string,
    label: string,
    payload: HitPayload
  ): void;
  trackException(
    trackerId: string,
    error: string,
    fatal: boolean,
    payload: HitPayload
  ): void;
  trackSocialInteraction(
    trackerId: string,
    network: string,
    action: string,
    targetUrl: string,
    payload: HitPayload
  ): void;
  setUser(trackerId: string, userId: string): void;
  setClient(trackerId: string, clientId: string): void;
  getClientId(trackerId: string): Promise<string>;
  allowIDFA(trackerId: string, enabled: boolean): void;
  setSamplingRate(trackerId: string, sampleRate: number): void;
  setAnonymizeIp(trackerId: string, enabled: boolean): void;
  setAppName(trackerId: string, appName: string): void;
  setAppVersion(trackerId: string, appVersion: string): void;
  setCurrency(trackerId: string, currencyCode: string): void;
  setTrackUncaughtExceptions(trackerId: string, enabled: boolean): void;
  dispatch(): Promise<boolean>;
}

export interface IGoogleTagManagerBridge extends EventSubscriptionVendor {
  openContainerWithId(containerId: string): Promise<boolean>;
  refreshContainer(): Promise<boolean>;
  booleanForKey(key: string): Promise<boolean>;
  stringForKey(key: string): Promise<string>;
  doubleForKey(key: any): Promise<number>;
  pushDataLayerEvent(event: DataLayerEvent): Promise<boolean>;
  registerFunctionCallTagHandler(functionName: string): Promise<boolean>;
  setVerboseLoggingEnabled(enabled: boolean): Promise<boolean>;
}

export interface IGoogleAnalyticsSettings {
  setOptOut(enabled): void;
  setDispatchInterval(intervalInSeconds): void;
  setDryRun(enabled): void;
}

const AnalyticsBridge = GoogleAnalyticsBridge as IGoogleAnalyticsBridge;
const TagManagerBridge = GoogleTagManagerBridge as IGoogleTagManagerBridge;
const AnalyticsSettings = GoogleAnalyticsSettings as IGoogleAnalyticsSettings;

export { TagManagerBridge };
export { AnalyticsBridge };
export { AnalyticsSettings };
