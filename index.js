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

    static trackPurchase(transactionId, transaction = {
      affiliation: 'App Store',
      revenue: 0.99,
      tax: 0,
      shipping: 0
    }, product = {
      name: '',
      sku: '',
      price: 0.99,
      quantity: 1
    }) {
      GoogleAnalyticsBridge.trackPurchase(transactionId, transaction, product);
    }

    static trackException(error, fatal) {
      GoogleAnalyticsBridge.trackException(error, fatal);
    }

    static setUser(userId) {
      GoogleAnalyticsBridge.setUser(userId);
    }

    static trackSocialInteraction(network, action, targetUrl) {
      GoogleAnalyticsBridge.trackSocialInteraction(network, action, targetUrl);
    }

    static setDryRun(enabled) {
      GoogleAnalyticsBridge.setDryRun(enabled);
    }
}


module.exports = GoogleAnalytics;
