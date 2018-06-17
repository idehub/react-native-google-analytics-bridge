package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.ecommerce.Product;
import com.google.android.gms.analytics.ecommerce.ProductAction;

public class GoogleAnalyticsPayload {
    private static abstract class InternalBuilder {
        public abstract void setProduct(final Product product);
        public abstract void setImpressionProduct(final Product product, final String impressionList);
        public abstract void setProductAction(final ProductAction productAction);
        public abstract void setCustomDimension(final Integer index, final String value);
        public abstract void setCustomMetric(final Integer index, final Integer value);
        public abstract void setUtmCampaignUrl(final String utmCampaignUrl);
        public abstract void setSessionState(final String sessionState);

        public void build(ReadableMap payload) {
            buildProducts(payload);
            buildImpressionProducts(payload);
            buildProductAction(payload);
            buildCustomDimensions(payload);
            buildCustomMetrics(payload);
            buildUtmCampaignUrl(payload);
            buildSessionState(payload);
        }

        private void buildProducts(ReadableMap payload) {
            if (payload.hasKey("products")) {
                ReadableArray products = payload.getArray("products");
                for (int i = 0; i < products.size(); i++) {
                    ReadableMap product = products.getMap(i);
                    Product ecommerceProduct = getEcommerceProduct(product);
                    this.setProduct(ecommerceProduct);
                }
            }
        }

        private void buildImpressionProducts(ReadableMap payload) {
            if (payload.hasKey("impressionProducts")) {
                String impressionList = payload.getString("impressionList");
                ReadableArray impressionProducts = payload.getArray("impressionProducts");
                for (int i = 0; i < impressionProducts.size(); i++) {
                    ReadableMap product = impressionProducts.getMap(i);
                    Product ecommerceProduct = getEcommerceProduct(product);
                    this.setImpressionProduct(ecommerceProduct, impressionList);
                }
            }
        }

        private void buildProductAction(ReadableMap payload) {
            if (payload.hasKey("productAction")) {
                ReadableMap productAction = payload.getMap("productAction");
                this.setProductAction(getEcommerceProductAction(productAction));
            }
        }

        private void buildCustomDimensions(ReadableMap payload) {
            if (payload.hasKey("customDimensions")) {
                ReadableMap customDimensions = payload.getMap("customDimensions");
                ReadableMapKeySetIterator iterator = customDimensions.keySetIterator();
                while (iterator.hasNextKey()) {
                    String dimensionIndex = iterator.nextKey();
                    ReadableType type = customDimensions.getType(dimensionIndex);
                    String value = null;
                    switch (type) {
                        case String:
                            value = customDimensions.getString(dimensionIndex);
                            break;
                        case Number:
                            value = Double.toString(customDimensions.getDouble(dimensionIndex));
                            break;
                        case Boolean:
                            value = Boolean.toString(customDimensions.getBoolean(dimensionIndex));
                            break;
                    }
                    if (value != null) {
                        this.setCustomDimension(Integer.parseInt(dimensionIndex), value);
                    }
                }

            }
        }

        private void buildCustomMetrics(ReadableMap payload) {
            if (payload.hasKey("customMetrics")) {
                ReadableMap customMetrics = payload.getMap("customMetrics");
                ReadableMapKeySetIterator iterator = customMetrics.keySetIterator();
                while (iterator.hasNextKey()) {
                    String index = iterator.nextKey();
                    this.setCustomMetric(Integer.parseInt(index), customMetrics.getInt(index));
                }

            }
        }

        private void buildUtmCampaignUrl(ReadableMap payload) {
            if (payload.hasKey("utmCampaignUrl")) {
                String utmCampaignUrl = payload.getString("utmCampaignUrl");
                this.setUtmCampaignUrl(utmCampaignUrl);
            }
        }

        private void buildSessionState(ReadableMap payload) {
            if (payload.hasKey("session")) {
                String sessionState = payload.getString("session");
                this.setSessionState(sessionState);
            }
        }
    }

    public static void addScreenViewBuilderPayload(final HitBuilders.ScreenViewBuilder builder, ReadableMap payload) {
        InternalBuilder internalBuilder = new InternalBuilder() {
            @Override
            public void setProduct(final Product product) {
                builder.addProduct(product);
            }

            @Override
            public void setImpressionProduct(final Product product, final String impressionList) {
                builder.addImpression(product, impressionList);
            }

            @Override
            public void setProductAction(ProductAction productAction) {
                builder.setProductAction(productAction);
            }

            @Override
            public void setCustomDimension(Integer index, String value) {
                builder.setCustomDimension(index, value);
            }

            @Override
            public void setCustomMetric(Integer index, Integer value) {
                builder.setCustomMetric(index, value);
            }

            @Override
            public void setUtmCampaignUrl(String utmCampaignUrl) {
                builder.setCampaignParamsFromUrl(utmCampaignUrl);
            }

            @Override
            public void setSessionState(String sessionState) {
                builder.set("&sc", sessionState);
            }
        };

        internalBuilder.build(payload);
    }

    public static void addEventBuilderPayload(final HitBuilders.EventBuilder builder, ReadableMap payload) {
        InternalBuilder internalBuilder = new InternalBuilder() {
            @Override
            public void setProduct(final Product product) {
                builder.addProduct(product);
            }

            @Override
            public void setImpressionProduct(final Product product, final String impressionList) {
                builder.addImpression(product, impressionList);
            }

            @Override
            public void setProductAction(ProductAction productAction) {
                builder.setProductAction(productAction);
            }

            @Override
            public void setCustomDimension(Integer index, String value) {
                builder.setCustomDimension(index, value);
            }

            @Override
            public void setCustomMetric(Integer index, Integer value) {
                builder.setCustomMetric(index, value);
            }

            @Override
            public void setUtmCampaignUrl(String utmCampaignUrl) {
                builder.setCampaignParamsFromUrl(utmCampaignUrl);
            }

            @Override
            public void setSessionState(String sessionState) {
                builder.set("&sc", sessionState);
            }
        };

        internalBuilder.build(payload);
    }

    public static void addTimingBuilderPayload(final HitBuilders.TimingBuilder builder, ReadableMap payload) {
        InternalBuilder internalBuilder = new InternalBuilder() {
            @Override
            public void setProduct(final Product product) {
                builder.addProduct(product);
            }

            @Override
            public void setImpressionProduct(final Product product, final String impressionList) {
                builder.addImpression(product, impressionList);
            }

            @Override
            public void setProductAction(ProductAction productAction) {
                builder.setProductAction(productAction);
            }

            @Override
            public void setCustomDimension(Integer index, String value) {
                builder.setCustomDimension(index, value);
            }

            @Override
            public void setCustomMetric(Integer index, Integer value) {
                builder.setCustomMetric(index, value);
            }

            @Override
            public void setUtmCampaignUrl(String utmCampaignUrl) {
                builder.setCampaignParamsFromUrl(utmCampaignUrl);
            }

            @Override
            public void setSessionState(String sessionState) {
                builder.set("&sc", sessionState);
            }
        };

        internalBuilder.build(payload);
    }

    public static void addExceptionBuilderPayload(final HitBuilders.ExceptionBuilder builder, ReadableMap payload) {
        InternalBuilder internalBuilder = new InternalBuilder() {
            @Override
            public void setProduct(final Product product) {
                builder.addProduct(product);
            }

            @Override
            public void setImpressionProduct(final Product product, final String impressionList) {
                builder.addImpression(product, impressionList);
            }

            @Override
            public void setProductAction(ProductAction productAction) {
                builder.setProductAction(productAction);
            }

            @Override
            public void setCustomDimension(Integer index, String value) {
                builder.setCustomDimension(index, value);
            }

            @Override
            public void setCustomMetric(Integer index, Integer value) {
                builder.setCustomMetric(index, value);
            }

            @Override
            public void setUtmCampaignUrl(String utmCampaignUrl) {
                builder.setCampaignParamsFromUrl(utmCampaignUrl);
            }

            @Override
            public void setSessionState(String sessionState) {
                builder.set("&sc", sessionState);
            }
        };

        internalBuilder.build(payload);
    }

    public static void addSocialBuilderPayload(final HitBuilders.SocialBuilder builder, ReadableMap payload) {
        InternalBuilder internalBuilder = new InternalBuilder() {
            @Override
            public void setProduct(final Product product) {
                builder.addProduct(product);
            }

            @Override
            public void setImpressionProduct(final Product product, final String impressionList) {
                builder.addImpression(product, impressionList);
            }

            @Override
            public void setProductAction(ProductAction productAction) {
                builder.setProductAction(productAction);
            }

            @Override
            public void setCustomDimension(Integer index, String value) {
                builder.setCustomDimension(index, value);
            }

            @Override
            public void setCustomMetric(Integer index, Integer value) {
                builder.setCustomMetric(index, value);
            }

            @Override
            public void setUtmCampaignUrl(String utmCampaignUrl) {
                builder.setCampaignParamsFromUrl(utmCampaignUrl);
            }

            @Override
            public void setSessionState(String sessionState) {
                builder.set("&sc", sessionState);
            }
        };

        internalBuilder.build(payload);
    }

    private static Product getEcommerceProduct(ReadableMap product) {
        Product ecommerceProduct = new Product()
                .setId(product.getString("id"))
                .setName(product.getString("name"));

        // A Product must have a name or id value. All other values are optional and don't need to be set.
        // https://developers.google.com/analytics/devguides/collection/android/v4/enhanced-ecommerce#measuring-impressions

        if (product.hasKey("brand")) {
            ecommerceProduct.setBrand(product.getString("brand"));
        }

        if (product.hasKey("price")) {
            ecommerceProduct.setPrice(product.getDouble("price"));
        }

        if (product.hasKey("quantity")) {
            ecommerceProduct.setQuantity(product.getInt("quantity"));
        }

        if (product.hasKey("variant")) {
            ecommerceProduct.setVariant(product.getString("variant"));
        }

        if (product.hasKey("category")) {
            ecommerceProduct.setCategory(product.getString("category"));
        }

        if (product.hasKey("couponCode")) {
            ecommerceProduct.setCouponCode(product.getString("couponCode"));
        }

        return ecommerceProduct;
    }

    private static ProductAction getEcommerceProductAction(ReadableMap productActionMap) {
        ProductAction productAction = new ProductAction(mapProductAction(productActionMap.getInt("action")));

        if (productActionMap.hasKey("transaction")) {
            ReadableMap transaction = productActionMap.getMap("transaction");
            productAction.setTransactionId(transaction.getString("id"));

            // Id is the only required value
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-data

            if (transaction.hasKey("tax")) {
                productAction.setTransactionTax(transaction.getDouble("tax"));
            }

            if (transaction.hasKey("revenue")) {
                productAction.setTransactionRevenue(transaction.getDouble("revenue"));
            }

            if (transaction.hasKey("shipping")) {
                productAction.setTransactionShipping(transaction.getDouble("shipping"));
            }

            if (transaction.hasKey("couponCode")) {
                productAction.setTransactionCouponCode(transaction.getString("couponCode"));
            }

            if (transaction.hasKey("affiliation")) {
                productAction.setTransactionAffiliation(transaction.getString("affiliation"));
            }
        }

        if (productActionMap.hasKey("checkoutStep")) {
            productAction.setCheckoutStep(productActionMap.getInt("checkoutStep"));
        }

        if (productActionMap.hasKey("checkoutOption")) {
            productAction.setCheckoutOptions(productActionMap.getString("checkoutOption"));
        }

        if (productActionMap.hasKey("productActionList")) {
            productAction.setProductActionList(productActionMap.getString("productActionList"));
        }

        if (productActionMap.hasKey("productListSource")) {
            productAction.setProductListSource(productActionMap.getString("productListSource"));
        }

        return productAction;
    }

    private static String mapProductAction(Integer action) {
        switch (action) {
            case 1:
                return ProductAction.ACTION_CLICK;
            case 2:
                return ProductAction.ACTION_DETAIL;
            case 3:
                return ProductAction.ACTION_ADD;
            case 4:
                return ProductAction.ACTION_REMOVE;
            case 5:
                return ProductAction.ACTION_CHECKOUT;
            case 6:
                return ProductAction.ACTION_CHECKOUT_OPTION;
            case 7:
            default:
                return ProductAction.ACTION_PURCHASE;
            case 8:
                return ProductAction.ACTION_REFUND;
        }
    }
}