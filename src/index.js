"use strict";

const GoogleAnalyticsBridge = require("react-native").NativeModules.GoogleAnalyticsBridge;

class GoogleAnalytics {
    static logEvent(event) {
      GoogleAnalyticsBridge.logEvent(event);
    }
}


module.exports = GoogleAnalytics;
