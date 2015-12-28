"use strict";

const GoogleAnalyticsBridge = require("react-native").NativeModules.GoogleAnalyticsBridge;

class GoogleAnalytics {
    static trackEvent(category, action, optionalValues = {}) {
      GoogleAnalyticsBridge.trackEvent(category, action, optionalValues);
    }
}


module.exports = GoogleAnalytics;
