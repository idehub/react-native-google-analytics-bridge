package com.idehub.GoogleAnalyticsBridge;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.Promise;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Tracker;
import com.google.android.gms.analytics.ecommerce.Product;
import com.google.android.gms.analytics.ecommerce.ProductAction;

import java.util.HashMap;
import java.util.Map;

public class GoogleAnalyticsBridge extends ReactContextBaseJavaModule {

    public GoogleAnalyticsBridge(ReactApplicationContext reactContext, String trackingId) {
        super(reactContext);
        _trackingId = trackingId;
    }

    private final String _trackingId;

    @Override
    public String getName() {
        return "GoogleAnalyticsBridge";
    }

    synchronized GoogleAnalytics getAnalyticsInstance() {
        return GoogleAnalytics.getInstance(getReactApplicationContext());
    }

    HashMap<String, Tracker> mTrackers = new HashMap<String, Tracker>();

    synchronized Tracker getTracker(String trackerId) {
       if (!mTrackers.containsKey(trackerId)) {
           GoogleAnalytics analytics = GoogleAnalytics.getInstance(getReactApplicationContext());
           analytics.setLocalDispatchPeriod(20);
           Tracker t = analytics.newTracker(trackerId);
           t.enableExceptionReporting(true);
           mTrackers.put(trackerId, t);
       }
       return mTrackers.get(trackerId);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("nativeTrackerId", _trackingId);
        return constants;
    }

    @ReactMethod
    public void trackScreenView(String trackerId, String screenName, @Nullable ReadableMap payload){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.setScreenName(screenName);

            HitBuilders.ScreenViewBuilder builder = new HitBuilders.ScreenViewBuilder();

            if (payload != null) {
                GoogleAnalyticsPayload.addScreenViewBuilderPayload(builder, payload);
            }

            tracker.send(builder.build());
        }
    }

    @ReactMethod
    public void trackEvent(String trackerId, String category, String action, @Nullable String label, @Nullable String value, @Nullable ReadableMap payload){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            HitBuilders.EventBuilder builder = new HitBuilders.EventBuilder()
                        .setCategory(category)
                        .setAction(action);

            if (label != null)
            {
                builder.setLabel(label);
            }
            if (value != null)
            {
                builder.setValue(Long.valueOf(value));
            }

            if (payload != null) {
                GoogleAnalyticsPayload.addEventBuilderPayload(builder, payload);
            }

            tracker.send(builder.build());
        }
    }

    @ReactMethod
    public void trackTiming(String trackerId, String category, Double interval, String name, @Nullable String label, @Nullable ReadableMap payload){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            HitBuilders.TimingBuilder builder = new HitBuilders.TimingBuilder()
                        .setCategory(category)
                        .setValue(interval.longValue())
                        .setVariable(name);

            if (label != null)
            {
                builder.setLabel(label);
            }

            if (payload != null)
            {
                GoogleAnalyticsPayload.addTimingBuilderPayload(builder, payload);
            }

            tracker.send(builder.build());
        }
    }

    @ReactMethod
    public void trackException(String trackerId, String error, Boolean fatal, @Nullable ReadableMap payload)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {

            HitBuilders.ExceptionBuilder builder = new HitBuilders.ExceptionBuilder()
                    .setDescription(error)
                    .setFatal(fatal);

            if (payload != null) {
                GoogleAnalyticsPayload.addExceptionBuilderPayload(builder, payload);
            }

            tracker.send(builder.build());
        }
    }

    @ReactMethod
    public void trackSocialInteraction(String trackerId, String network, String action, String targetUrl, @Nullable ReadableMap payload)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            HitBuilders.SocialBuilder builder = new HitBuilders.SocialBuilder()
                    .setNetwork(network)
                    .setAction(action)
                    .setTarget(targetUrl);

            if (payload != null) {
                GoogleAnalyticsPayload.addSocialBuilderPayload(builder, payload);
            }

            tracker.send(builder.build());
        }
    }

    @ReactMethod
    public void setUser(String trackerId, String userId)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            tracker.set("&uid", userId);
        }
    }

    @ReactMethod
    public void setClient(String trackerId, String clientId)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            tracker.set("&cid", clientId);
        }
    }

    @ReactMethod
    public void getClientId(String trackerId, Promise promise)
    {
        try {
            Tracker tracker = getTracker(trackerId);
            String clientId = "";
            if (tracker != null) {
                clientId = tracker.get("&cid");
            }
            promise.resolve(clientId);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void allowIDFA(String trackerId, Boolean enabled)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            tracker.enableAdvertisingIdCollection(enabled);
        }
    }

    @ReactMethod
    public void setSamplingRate(String trackerId, Double sampleRate){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.setSampleRate(sampleRate);
        }
    }

    @ReactMethod
    public void setAnonymizeIp(String trackerId, Boolean enabled){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.setAnonymizeIp(enabled);
        }
    }

    @ReactMethod
    public void setAppName(String trackerId, String appName){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.setAppName(appName);
        }
    }
    @ReactMethod
    public void setAppVersion(String trackerId, String appVersion){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.setAppVersion(appVersion);
        }
    }

    @ReactMethod
    public void setCurrency(String trackerId, String currencyCode)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            tracker.set("&cu", currencyCode);
        }
    }

    // A special case. For iOS this is set on all trackers. On Android it is on each tracker.
    @ReactMethod
    public void setTrackUncaughtExceptions(String trackerId, Boolean enabled){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.enableExceptionReporting(enabled);
        }
    }
  
    @ReactMethod
    public void createNewSession(String trackerId, String screenName) {
        Tracker tracker = getTracker(trackerId);
        tracker.setScreenName(screenName);
        tracker.send(new HitBuilders.ScreenViewBuilder().setNewSession().build());
    }

    @ReactMethod
    public void dispatch(Promise promise) {
        GoogleAnalytics analytics = getAnalyticsInstance();
        try {
            analytics.dispatchLocalHits();
            promise.resolve(true);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }
}
