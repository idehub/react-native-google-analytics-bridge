"use strict";

const GoogleAnalyticsBridge = require("react-native").NativeModules.GoogleAnalyticsBridge;

class GoogleAnalytics {
    /**
     * Track the current screen/view
     * @param  {String} screenName The name of the current screen
     */
    static trackScreenView(screenName) {
        GoogleAnalyticsBridge.trackScreenView(screenName);
    }

    /**
     * Track an event that has occured
     * @param  {String} category       The event category
     * @param  {String} action         The event action
     * @param  {Object} optionalValues An object containing optional label and value
     */
    static trackEvent(category, action, optionalValues = {}) {
        GoogleAnalyticsBridge.trackEvent(category, action, optionalValues);
    }

    /**
     * Track an event that has occured
     * @param  {String} category       The event category
     * @param  {Number} value         	The timing measurement in milliseconds
     * @param  {Object} optionalValues An object containing optional name and label
     */
    static trackTiming(category, value, optionalValues = {}) {
        GoogleAnalyticsBridge.trackTiming(category, value, optionalValues);
    }

    /**
     * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
     * @param  {Object} product       An object with product values
     * @param  {Object} transaction   An object with transaction values
     * @param  {String} eventCategory The event category, defaults to Ecommerce
     * @param  {String} eventAction   The event action, defaults to Purchase
     */
    static trackPurchaseEvent(product = {}, transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
        GoogleAnalyticsBridge.trackPurchaseEvent(product, transaction, eventCategory, eventAction);
    }

    /**
     * Track an exception
     * @param  {String} error The description of the error
     * @param  {Boolean} fatal A value indiciating if the error was fatal, defaults to false
     */
    static trackException(error, fatal = false) {
        GoogleAnalyticsBridge.trackException(error, fatal);
    }

    /**
     * Sets the current userId for tracking.
     * @param {String} userId The current userId
     */
    static setUser(userId) {
        GoogleAnalyticsBridge.setUser(userId);
    }

    /**
     * Sets if IDFA (identifier for advertisers) collection should be enabled
     * @param  {Boolean} enabled Defaults to true
     */
    static allowIDFA(enabled = true) {
        GoogleAnalyticsBridge.allowIDFA(enabled);
    }

    /**
     * Track a social interaction, Facebook, Twitter, etc.
     * @param  {String} network
     * @param  {String} action
     * @param  {String} targetUrl
     */
    static trackSocialInteraction(network, action, targetUrl) {
        GoogleAnalyticsBridge.trackSocialInteraction(network, action, targetUrl);
    }

    /**
     * Sets if the tracker should have dry run enabled.
     * If dry run is enabled, no analytics data will be sent to your tracker.
     * @param {Boolean} enabled
     */
    static setDryRun(enabled) {
        GoogleAnalyticsBridge.setDryRun(enabled);
    }
    
    /**
     * Sets the trackers dispatch interval
     * This will influence how often batches of events, screen views, etc 
     * are sent to your tracker.
     * @param {Number} intervalInSeconds
     */
    static setDispatchInterval(intervalInSeconds) {
        GoogleAnalyticsBridge.setDispatchInterval(intervalInSeconds);
    }

    /**
     * Sets if uncaught exceptions should be tracked
     * @param {Boolean} enabled
     */
    static setTrackUncaughtExceptions(enabled) {
        GoogleAnalyticsBridge.setTrackUncaughtExceptions(enabled);
    }
}

module.exports = GoogleAnalytics;
