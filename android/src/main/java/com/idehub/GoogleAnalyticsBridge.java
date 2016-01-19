package com.idehub.GoogleAnalyticsBridge;

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

    private String _trackingId;

    @Override
    public String getName() {
        return "GoogleAnalyticsBridge";
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

    synchronized GoogleAnalytics getAnalyticsInstance() {
      return GoogleAnalytics.getInstance(getReactApplicationContext());
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod
    public void trackScreenView(String screenName){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null)
        {
          tracker.setScreenName(screenName);

          tracker.send(new HitBuilders.ScreenViewBuilder().build());
        }
    }

    @ReactMethod
    public void trackEvent(String category, String action, ReadableMap optionalValues){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null)
        {
            HitBuilders.EventBuilder hit = new HitBuilders.EventBuilder()
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

    @ReactMethod
    public void trackPurchaseEvent(ReadableMap product, ReadableMap transaction, String eventCategory, String eventAction){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null) {
            Product product = new Product()
                    .setId(product.getString("productId"))
                    .setName(product.getString("name"))
                    .setCategory(product.getString("category"))
                    .setBrand(product.getString("brand"))
                    .setVariant(product.getString("variant"))
                    .setPrice(product.getDouble("price"))
                    .setCouponCode(product.getString("couponCode"))
                    .setQuantity(product.getInt("quantity"));

            ProductAction productAction = new ProductAction(ProductAction.ACTION_PURCHASE)
                    .setTransactionId(transaction.getString("transactionId"))
                    .setTransactionAffiliation(transaction.getString("affiliation"))
                    .setTransactionRevenue(transaction.getDouble("revenue"))
                    .setTransactionTax(transaction.getDouble("tax"))
                    .setTransactionShipping(transaction.getDouble("shipping"))
                    .setTransactionCouponCode(transaction.getString("couponCode"));

            HitBuilders.EventBuilder hit = new HitBuilders.EventBuilder()
                    .setProduct(product)
                    .setCategory(category)
                    .setProductAction(productAction)
                    .setAction(action);

            t.send(hit.build());
        }
    }

    @ReactMethod
    public void setDryRun(Boolean enabled){
        GoogleAnalytics analytics = getAnalyticsInstance();

        if (analytics != null)
        {
          analytics.setDryRun(enabled);
        }
    }
}
