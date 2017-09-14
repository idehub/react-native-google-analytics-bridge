import { NativeModules } from "react-native";
const { GoogleTagManagerBridge, GoogleAnalyticsBridge } = NativeModules;

if (!GoogleTagManagerBridge || !GoogleAnalyticsBridge) {
  console.error(
    "Something went wrong initializing the native react-native-google-analytics-bridge module.\nPlease check your configuration.\nDid you forget to run 'react-native link' or install your node_modules?"
  );
}

export { GoogleTagManagerBridge };
export { GoogleAnalyticsBridge };
