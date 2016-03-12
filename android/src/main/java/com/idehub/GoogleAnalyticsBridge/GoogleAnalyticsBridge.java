package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Tracker;
import com.google.android.gms.analytics.ecommerce.Product;
import com.google.android.gms.analytics.ecommerce.ProductAction;

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
    public void trackTiming(String category, Double value, ReadableMap optionalValues){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null)
        {
            HitBuilders.TimingBuilder hit = new HitBuilders.TimingBuilder()
                        .setCategory(category)
                        .setValue(value.longValue());

            if (optionalValues.hasKey("name"))
            {
                hit.setVariable(optionalValues.getString("name"));
            }
            if (optionalValues.hasKey("label"))
            {
                hit.setLabel(optionalValues.getString("label"));
            }

            tracker.send(hit.build());
        }
    }

    @ReactMethod
    public void trackPurchaseEvent(ReadableMap product, ReadableMap transaction, String eventCategory, String eventAction){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null) {
            Product ecommerceProduct = new Product()
                    .setId(product.getString("id"))
                    .setName(product.getString("name"))
                    .setCategory(product.getString("category"))
                    .setBrand(product.getString("brand"))
                    .setVariant(product.getString("variant"))
                    .setPrice(product.getDouble("price"))
                    .setCouponCode(product.getString("couponCode"))
                    .setQuantity(product.getInt("quantity"));

            ProductAction productAction = new ProductAction(ProductAction.ACTION_PURCHASE)
                    .setTransactionId(transaction.getString("id"))
                    .setTransactionAffiliation(transaction.getString("affiliation"))
                    .setTransactionRevenue(transaction.getDouble("revenue"))
                    .setTransactionTax(transaction.getDouble("tax"))
                    .setTransactionShipping(transaction.getDouble("shipping"))
                    .setTransactionCouponCode(transaction.getString("couponCode"));

            HitBuilders.EventBuilder hit = new HitBuilders.EventBuilder()
                    .addProduct(ecommerceProduct)
                    .setProductAction(productAction)
                    .setCategory(eventCategory)
                    .setAction(eventAction);

            tracker.send(hit.build());
        }
    }

    @ReactMethod
    public void trackException(String error, Boolean fatal)
    {
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null) {
            tracker.send(new HitBuilders.ExceptionBuilder()
                    .setDescription(error)
                    .setFatal(fatal)
                    .build());
        }
    }

    @ReactMethod
    public void setUser(String userId)
    {
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null) {
            tracker.set("&uid", userId);
        }
    }

    @ReactMethod
    public void allowIDFA(Boolean enabled)
    {
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null) {
            tracker.enableAdvertisingIdCollection(enabled);
        }
    }

    @ReactMethod
    public void trackSocialInteraction(String network, String action, String targetUrl)
    {
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null) {
            tracker.send(new HitBuilders.SocialBuilder()
                    .setNetwork(network)
                    .setAction(action)
                    .setTarget(targetUrl)
                    .build());
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

    @ReactMethod
    public void setDispatchInterval(Integer intervalInSeconds){
        GoogleAnalytics analytics = getAnalyticsInstance();

        if (analytics != null)
        {
            analytics.setLocalDispatchPeriod(intervalInSeconds);
        }
    }

    @ReactMethod
    public void setTrackUncaughtExceptions(Boolean enabled){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null)
        {
            tracker.enableExceptionReporting(enabled);
        }
    }


    @ReactMethod
    public void setAnonymizeIp(Boolean enabled){
        Tracker tracker = getTracker(_trackingId);

        if (tracker != null)
        {
            tracker.setAnonymizeIp(enabled);
        }
    }

    @ReactMethod
    public void setOptOut(Boolean enabled){
      GoogleAnalytics analytics = getAnalyticsInstance();

      if (analytics != null)
      {
            analytics.setAppOptOut(true);
      }
    }
}
