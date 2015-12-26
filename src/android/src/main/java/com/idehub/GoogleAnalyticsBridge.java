package com.idehub;

import android.content.Context;
import android.app.Application;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Logger;
import com.google.android.gms.analytics.Tracker;

import java.util.HashMap;
import java.util.Map;

public class GoogleAnalyticsBridge extends ReactContextBaseJavaModule{

    public GoogleAnalyticsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GoogleAnalyticsBridge";
    }

    HashMap<String, Tracker> mTrackers = new HashMap<String, Tracker>();

    synchronized Tracker getTracker(String trackerId) {
       if (!mTrackers.containsKey(trackerId)) {
           GoogleAnalytics analytics = GoogleAnalytics.getInstance(getReactApplicationContext());
           Tracker t = analytics.newTracker(trackerId);
           t.setAnonymizeIp(true);
           mTrackers.put(trackerId, t);
       }
       return mTrackers.get(trackerId);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    //String trackerId (maybe config?), String eventCategory, Callback callback
    @ReactMethod
    public void logEvent(String eventAction){
        Tracker tracker = getTracker("UA-12345-1");
        Boolean tracked = false;
        if (tracker != null)
        {
          tracker.send(new HitBuilders.EventBuilder()
                .setCategory("Test")
                .setAction(eventAction)
                .build());
          tracked = true;
        }
    }
}
