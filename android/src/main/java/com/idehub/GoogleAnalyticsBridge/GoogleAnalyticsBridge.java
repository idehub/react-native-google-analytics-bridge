package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

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
        constants.put("nativeTrackerId", _trackingId);
        return constants;
    }

    @ReactMethod
    public void trackScreenView(String trackerId, String screenName){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.setScreenName(screenName);

            tracker.send(new HitBuilders.ScreenViewBuilder().build());
        }
    }

    @ReactMethod
    public void trackEvent(String trackerId, String category, String action, ReadableMap optionalValues){
        Tracker tracker = getTracker(trackerId);

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
    public void trackTiming(String trackerId, String category, Double value, ReadableMap optionalValues){
        Tracker tracker = getTracker(trackerId);

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
    public void trackPurchaseEvent(String trackerId, ReadableMap product, ReadableMap transaction, String eventCategory, String eventAction){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {

            HitBuilders.EventBuilder hit = new HitBuilders.EventBuilder()
                   .addProduct(this.getPurchaseProduct(product))
                   .setProductAction(this.getPurchaseTransaction(transaction))
                   .setCategory(eventCategory)
                   .setAction(eventAction);

            tracker.send(hit.build());
        }
    }

    @ReactMethod
    public void trackMultiProductsPurchaseEvent(String trackerId, ReadableArray products, ReadableMap transaction, String eventCategory, String eventAction) {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {

            HitBuilders.EventBuilder hit = new HitBuilders.EventBuilder()
                   .setProductAction(this.getPurchaseTransaction(transaction))
                   .setCategory(eventCategory)
                   .setAction(eventAction);

            for (int i = 0; i < products.size(); i++) {
                ReadableMap product = products.getMap(i);
                hit.addProduct(this.getPurchaseProduct(product));
            }

            tracker.send(hit.build());
        }
    }

    private ProductAction getPurchaseTransaction(ReadableMap transaction) {
        ProductAction productAction = new ProductAction(ProductAction.ACTION_PURCHASE)
           .setTransactionId(transaction.getString("id"))
           .setTransactionTax(transaction.getDouble("tax"))
           .setTransactionRevenue(transaction.getDouble("revenue"))
           .setTransactionShipping(transaction.getDouble("shipping"))
           .setTransactionCouponCode(transaction.getString("couponCode"))
           .setTransactionAffiliation(transaction.getString("affiliation"));

        return productAction;
    }

    private Product getPurchaseProduct(ReadableMap product) {
        Product ecommerceProduct = new Product()
           .setId(product.getString("id"))
           .setName(product.getString("name"))
           .setBrand(product.getString("brand"))
           .setPrice(product.getDouble("price"))
           .setQuantity(product.getInt("quantity"))
           .setVariant(product.getString("variant"))
           .setCategory(product.getString("category"));

        if(product.hasKey("couponCode")) {
           ecommerceProduct.setCouponCode(product.getString("couponCode"));
        }

        return ecommerceProduct;
    }

    @ReactMethod
    public void trackException(String trackerId, String error, Boolean fatal)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            tracker.send(new HitBuilders.ExceptionBuilder()
                    .setDescription(error)
                    .setFatal(fatal)
                    .build());
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
    public void allowIDFA(String trackerId, Boolean enabled)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            tracker.enableAdvertisingIdCollection(enabled);
        }
    }

    @ReactMethod
    public void trackSocialInteraction(String trackerId, String network, String action, String targetUrl)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null) {
            tracker.send(new HitBuilders.SocialBuilder()
                    .setNetwork(network)
                    .setAction(action)
                    .setTarget(targetUrl)
                    .build());
        }
    }

    @ReactMethod
    public void trackScreenViewWithCustomDimensionValues(String trackerId, String screenName, ReadableMap dimensionIndexValues)
    {
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.setScreenName(screenName);
            HitBuilders.ScreenViewBuilder screenBuilder = new HitBuilders.ScreenViewBuilder();
            ReadableMapKeySetIterator iterator = dimensionIndexValues.keySetIterator();
            while (iterator.hasNextKey()) {
                String dimensionIndex = iterator.nextKey();
                String dimensionValue = dimensionIndexValues.getString(dimensionIndex);
                screenBuilder.setCustomDimension(Integer.parseInt(dimensionIndex), dimensionValue);
            }
            tracker.send(screenBuilder.build());
        }
    }

    @ReactMethod
    public void trackEventWithCustomDimensionValues(String trackerId, String category, String action, ReadableMap optionalValues, ReadableMap dimensionIndexValues)
    {
        this.trackEventWithCustomDimensionAndMetricValues(trackerId, category, action, optionalValues, dimensionIndexValues, null);
    }

    @ReactMethod
    public void trackEventWithCustomDimensionAndMetricValues(String trackerId, String category, String action, ReadableMap optionalValues, ReadableMap dimensionIndexValues, ReadableMap metricIndexValues)
    {
        Tracker tracker = getTracker(trackerId);

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

            ReadableMapKeySetIterator iterator = dimensionIndexValues.keySetIterator();
            while (iterator.hasNextKey()) {
                String dimensionIndex = iterator.nextKey();
                String dimensionValue = dimensionIndexValues.getString(dimensionIndex);
                hit.setCustomDimension(Integer.parseInt(dimensionIndex), dimensionValue);
            }

            if(metricIndexValues != null){
              ReadableMapKeySetIterator metricIterator = metricIndexValues.keySetIterator();
              while (metricIterator.hasNextKey()) {
                  String metricIndex = metricIterator.nextKey();
                  int metricValue = metricIndexValues.getInt(metricIndex);
                  hit.setCustomMetric(Integer.parseInt(metricIndex), metricValue);
              }
            }

            tracker.send(hit.build());
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
    public void setTrackUncaughtExceptions(String trackerId, Boolean enabled){
        Tracker tracker = getTracker(trackerId);

        if (tracker != null)
        {
            tracker.enableExceptionReporting(enabled);
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
    public void setOptOut(Boolean enabled){
        GoogleAnalytics analytics = getAnalyticsInstance();

        if (analytics != null)
        {
            analytics.setAppOptOut(enabled);
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
}
