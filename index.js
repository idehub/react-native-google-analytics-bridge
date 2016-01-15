"use strict";

const GoogleAnalyticsBridge = require("react-native").NativeModules.GoogleAnalyticsBridge;

class GoogleAnalytics {
    static trackScreenView(screenName) {
      GoogleAnalyticsBridge.trackScreenView(screenName);
    }

    // The optional values are label, and value. Label is a string, value is a number. Eg. { label "v1.0.3", value: 20 }
    static trackEvent(category, action, optionalValues = {}) {
      GoogleAnalyticsBridge.trackEvent(category, action, optionalValues);
    }

    static trackPurchase(id, transaction = {
      affiliation: 'App Store',
      revenue: 0.99,
      tax: 0,
      shipping: 0
    }, item = {
      name: '',
      sku: '',
      price: 0.99,
      quantity: 1
    }) {
      GoogleAnalyticsBridge.trackPurchase(id, transaction, item);
    }

    static setDryRun(enabled) {
      GoogleAnalyticsBridge.setDryRun(enabled);
    }
}


module.exports = GoogleAnalytics;
