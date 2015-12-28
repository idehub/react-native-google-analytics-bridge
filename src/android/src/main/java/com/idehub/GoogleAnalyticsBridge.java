package com.idehub;

import android.content.Context;
import android.app.Application;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Logger;
import com.google.android.gms.analytics.Tracker;

import java.util.HashMap;
import java.util.Map;

public class GoogleAnalyticsBridge extends ReactContextBaseJavaModule{

    public GoogleAnalyticsBridge(ReactApplicationContext reactContext, String trackingId) {
        super(reactContext);
        _trackingId = trackingId;
    }

    private string _trackingId;

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

    @ReactMethod
    public void trackEvent(String category, String action, ReadableMap optionalValues){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null)
        {
          var hit = new HitBuilders.EventBuilder()
                        .setCategory(category)
                        .setAction(action);
          if (optionalValues.hasKey("label"))
          {
              hit.setLabel(optionalValues.getString("label"));
          }
          if (optionalValues.hasKey("value"))
          {
              hit.setValue(optionalValues.getInt("value"));
          }

          tracker.send(hit.build());
        }
    }
}
