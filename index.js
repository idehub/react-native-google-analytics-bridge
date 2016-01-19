"use strict";

const GoogleAnalyticsBridge = require("react-native").NativeModules.GoogleAnalyticsBridge;

class GoogleAnalytics {
    static trackScreenView(screenName) {
      GoogleAnalyticsBridge.trackScreenView(screenName);
    }

    static trackEvent(category, action, optionalValues = {}) {
      GoogleAnalyticsBridge.trackEvent(category, action, optionalValues);
    }

    static trackPurchaseEvent(product, transaction, eventCategory = "Ecommerce", eventAction = "Purchase") {
      GoogleAnalyticsBridge.trackPurchaseEvent(product, transaction, eventCategory, eventAction);
    }

    static setDryRun(enabled) {
      GoogleAnalyticsBridge.setDryRun(enabled);
    }
}


module.exports = GoogleAnalytics;
