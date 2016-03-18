"use strict";

const GoogleAnalyticsBridge = require("react-native").NativeModules.GoogleAnalyticsBridge;

let _trackerId = GoogleAnalyticsBridge.nativeTrackerId;

function getTrackerId() {
    if (!_trackerId) {
        throw new Error("TrackerId not set. See documentation for more details");
    }
    return _trackerId
}

class GoogleAnalytics {
    /**
     * Track the current screen/view
     * @param  {String} screenName The name of the current screen
     */
    static trackScreenView(screenName) {
        GoogleAnalyticsBridge.trackScreenView(getTrackerId(), screenName);
    }

    /**
     * Track an event that has occured
     * @param  {String} category       The event category
     * @param  {String} action         The event action
     * @param  {Object} optionalValues An object containing optional label and value
     */
    static trackEvent(category, action, optionalValues = {}) {
        GoogleAnalyticsBridge.trackEvent(getTrackerId(), category, action, optionalValues);
    }

    /**
     * Track an event that has occured
     * @param  {String} category       The event category
     * @param  {Number} value         	The timing measurement in milliseconds
     * @param  {Object} optionalValues An object containing optional name and label
     */
    static trackTiming(category, value, optionalValues = {}) {
        GoogleAnalyticsBridge.trackTiming(getTrackerId(), category, value, optionalValues);
    }

    /**
     * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
     * @param  {Object} product       An object with product values
     * @param  {Object} transaction   An object with transaction values
     * @param  {String} eventCategory The event category, defaults to Ecommerce
     * @param  {String} eventAction   The event action, defaults to Purchase
     */
    static trackPurchaseEvent(product = {}, transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
        GoogleAnalyticsBridge.trackPurchaseEvent(getTrackerId(), product, transaction, eventCategory, eventAction);
    }

    /**
     * Track an exception
     * @param  {String} error The description of the error
     * @param  {Boolean} fatal A value indiciating if the error was fatal, defaults to false
     */
    static trackException(error, fatal = false) {
        GoogleAnalyticsBridge.trackException(getTrackerId(), error, fatal);
    }

    /**
     * Sets the current userId for tracking.
     * @param {String} userId The current userId
     */
    static setUser(userId) {
        GoogleAnalyticsBridge.setUser(getTrackerId(), userId);
    }

    /**
     * Sets if IDFA (identifier for advertisers) collection should be enabled
     * @param  {Boolean} enabled Defaults to true
     */
    static allowIDFA(enabled = true) {
        GoogleAnalyticsBridge.allowIDFA(getTrackerId(), enabled);
    }

    /**
     * Track a social interaction, Facebook, Twitter, etc.
     * @param  {String} network
     * @param  {String} action
     * @param  {String} targetUrl
     */
    static trackSocialInteraction(network, action, targetUrl) {
        GoogleAnalyticsBridge.trackSocialInteraction(getTrackerId(), network, action, targetUrl);
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
        GoogleAnalyticsBridge.setTrackUncaughtExceptions(getTrackerId(), enabled);
    }

    /**
     * Sets if AnonymizeIp is enabled
     * If enabled the last octet of the IP address will be removed
     * @param {Boolean} enabled
     */
    static setAnonymizeIp(enabled) {
        GoogleAnalyticsBridge.setAnonymizeIp(getTrackerId(), enabled);
    }

    /**
     * Sets if OptOut is active and disables Google Analytics
     * This has to be set each time the App starts
     * @param {Boolean} enabled
     */
    static setOptOut(enabled) {
        GoogleAnalyticsBridge.setOptOut(enabled);
    }

    /**
     * Sets new tracker ID for all subsequent static calls
     * @param {String} tracker ID
     */
    static setTrackerId(trackerId) {
        _trackerId = trackerId;
    }

}

module.exports = GoogleAnalytics;
