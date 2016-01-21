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

    static trackPurchase(transactionId, transaction = {}, product = {}) {
      GoogleAnalyticsBridge.trackPurchase(transactionId, transaction, product);
    }

    static trackPurchaseEnhanced(product = {}, transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
      GoogleAnalyticsBridge.trackPurchaseEvent(product, transaction, eventCategory, eventAction);
    }

    static trackException(error, fatal = false) {
      GoogleAnalyticsBridge.trackException(error, fatal);
    }

    static setUser(userId) {
      GoogleAnalyticsBridge.setUser(userId);
    }

    static allowIDFA(enabled = true) {
      GoogleAnalyticsBridge.allowIDFA(enabled);
    }

    static trackSocialInteraction(network, action, targetUrl) {
      GoogleAnalyticsBridge.trackSocialInteraction(network, action, targetUrl);
    }

    static setDryRun(enabled) {
      GoogleAnalyticsBridge.setDryRun(enabled);
    }
}

module.exports = GoogleAnalytics;
