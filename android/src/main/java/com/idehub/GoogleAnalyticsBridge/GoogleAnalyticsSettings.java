package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.analytics.GoogleAnalytics;

public class GoogleAnalyticsSettings extends ReactContextBaseJavaModule {

    public GoogleAnalyticsSettings(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() { return "GoogleAnalyticsSettings";  }

    synchronized GoogleAnalytics getAnalyticsInstance() {
        return GoogleAnalytics.getInstance(getReactApplicationContext());
    }

    @ReactMethod
    public void setDryRun(Boolean enabled){
        GoogleAnalytics analytics = getAnalyticsInstance();

        if (analytics != null)
        {
            analytics.setDryRun(enabled);
        }
    }

    @ReactMethod
    public void setDispatchInterval(Integer intervalInSeconds){
        GoogleAnalytics analytics = getAnalyticsInstance();

        if (analytics != null)
        {
            analytics.setLocalDispatchPeriod(intervalInSeconds);
        }
    }

    @ReactMethod
    public void setOptOut(Boolean enabled){
        GoogleAnalytics analytics = getAnalyticsInstance();

        if (analytics != null)
        {
            analytics.setAppOptOut(enabled);
        }
    }
}
