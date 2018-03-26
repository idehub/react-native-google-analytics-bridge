# GoogleAnalyticsBridge [![npm version](https://img.shields.io/npm/v/react-native-google-analytics-bridge.svg)](https://www.npmjs.com/package/react-native-google-analytics-bridge) [![Build Status](https://travis-ci.org/idehub/react-native-google-analytics-bridge.svg?branch=master)](https://travis-ci.org/idehub/react-native-google-analytics-bridge)

**Google Analytics Bridge** is built to provide an easy interface to the native Google Analytics libraries on both **iOS** and **Android**.

## Why a native bridge? Why not use just JavaScript?

The key difference with the native bridge is that you get a lot of the metadata handled automatically by the Google Analytics native library. This will include the device UUID, device model, viewport size, OS version etc.

You will only have to send in a few parameteres when tracking, e.g:

```javascript
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
let tracker = new GoogleAnalyticsTracker("UA-12345-1");

tracker.trackScreenView("Home");
tracker.trackEvent("testcategory", "testaction");
```

## Use environment's Google Service Version (due to crash on Google Service version 12

You can specify googlePlayServicesVersion in "android/gradle.properties". Otherwise, it will take default version

e.g.
`googlePlayServicesVersion=11.8.0`



## Problems with tracking? Visitors not showing up?

This is **NOT** (_normally_) an error with this library. Please read [this guide on how to set up your Google Analytics account/property](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Creating-a-Google-Analytics-property-for-mobile-analytics) for mobile analytics.

## Content

* [Installation](#installation-and-linking-libraries)
* [Manual installation](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Manual-installation)
* [Usage](#usage)
* [JavaScript API](#javascript-api)
* [Troubleshooting](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Troubleshooting)
* [A/B testing](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Simple-A-B-testing)
* [Roadmap](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Roadmap)

## Installation and linking libraries

* For React Native >= `0.40` use version `5.0.0` (and up) of this module.
* For React Native < `0.40` use version `4.0.3`.

Install with npm: `npm install --save react-native-google-analytics-bridge`

Or, install with yarn: `yarn add react-native-google-analytics-bridge`

Either way, then link with: `react-native link react-native-google-analytics-bridge`

If it doesn't work immediately after this, consult the [manual installation guide](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Manual-installation). Both Android and iOS has a couple of prerequisite SDKs linked and installed.

**Important**: Does this library work with Expo? We have to sort of invert the question a bit, because it should be: does Expo work with other libraries? And the [answer is no](https://docs.expo.io/versions/latest/introduction/faq.html#what-is-the-difference-between-expo-and-react-native):

> The most limiting thing about Expo is that you can’t add in your own native modules without `detach`ing and using ExpoKit.

This includes using [`create-react-native-app`](https://github.com/react-community/create-react-native-app#what-are-the-limitations-of-create-react-native-app) which also makes use of Expo.

## Usage

```javascript
// You have access to three classes in this module:
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

// The tracker must be constructed, and you can have multiple:
let tracker1 = new GoogleAnalyticsTracker("UA-12345-1");
let tracker2 = new GoogleAnalyticsTracker("UA-12345-2");

tracker1.trackScreenView("Home");
tracker1.trackEvent("Customer", "New");

// The GoogleAnalyticsSettings is static, and settings are applied across all trackers:
GoogleAnalyticsSettings.setDispatchInterval(30);
// Setting `dryRun` to `true` lets you test tracking without sending data to GA
GoogleAnalyticsSettings.setDryRun(true);

// GoogleTagManager is also static, and works only with one container. All functions here are Promises:
GoogleTagManager.openContainerWithId("GT-NZT48")
  .then(() => {
    return GoogleTagManager.stringForKey("pack");
  })
  .then(pack => {
    console.log("Pack: ", pack);
  })
  .catch(err => {
    console.log(err);
  });
```

## Providing an existing GTM container

In some scenarios it might be helpful to provide an opened GTM container to the bridge. Some possible scenarios where this could be helpful:

* You want to preload some config before loading the jsbundle. For instance checking an experiment variable to determine which jsbundle to load.
* You have a brownfield app that mixes native UI and react native UI that should share the same container.
* You want to try and make sure that the container is loaded before starting the app.

This will require that you are familiar with the native api for GTM on whatever platforms you want to support. Generally the process is to load your container at startup, and hold the creation of the react native bridge until the container is loaded. On iOS you can then initialize an RCTGoogleTagManagerBridge and set the container property. On Android the process is similar, but you will need to supply the ContainerHolder to the GoogleAnalyticsBridgePackage instead.

## JavaScript API

* [GoogleAnalyticsTracker](#googleanalyticstracker-api)
* [GoogleAnalyticsSettings](#googleanalyticssettings-api)
* [GoogleTagManager](#googletagmanager-api)

## GoogleAnalyticsTracker API

### new GoogleAnalyticsTracker(trackerId, customDimensionsFieldsIndexMap = {})

* **trackerId (required):** String, your tracker id, something like: UA-12345-1
* **customDimensionsFieldsIndexMap (optional):** {{fieldName: fieldIndex}} Custom dimensions field/index pairs

```javascript
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
let tracker = new GoogleAnalyticsTracker("UA-12345-1");
```

Google Analytics expects dimensions to be tracked by indices, and not field names.
To simplify this, you can construct a tracker with a customDimensionsFieldsIndexMap. With this, you can map field names to indices, e.g:

```javascript
let tracker2 = new GoogleAnalyticsTracker("UA-12345-3", { test: 1 });
tracker2.trackScreenViewWithCustomDimensionValues("Home", { test: "Beta" });
```

Here the underlying logic will transform the custom dimension, so what ends up being sent to GA is `{ 1: 'Beta' }`.
This should make it easier to use custom dimensions. If you do not provide a customDimensionsFieldsIndexMap, the custom dimensions are passed through untouched.

### trackScreenView(screenName)

* **screenName (required):** String, name of current screen

**Important**: Calling this will also set the "current view" for other calls. So events tracked will be tagged as having occured on the current view, `Home` in this example. This means it is important to track navigation, especially if events can fire on different views.

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/screens) for more info

```javascript
tracker.trackScreenView("Home");
```

### trackEvent(category, action, optionalValues)

* **category (required):** String, category of event
* **action (required):** String, name of action
* **optionalValues:** Object
  * **label:** String
  * **value:** Number

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/events) for more info.

```javascript
tracker.trackEvent("testcategory", "testaction");
// or
tracker.trackEvent("testcategory", "testaction", {
  label: "v1.0.3",
  value: 22
});
```

### trackTiming(category, value, optionalValues)

* **category (required):** String, category of the timed event
* **value (required):** Number, the timing measurement in milliseconds
* **optionalValues:** Object
  * **name (required):** String, the name of the timed event
  * **label:** String, the label of the timed event

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/usertimings) for more info.

```javascript
tracker.trackTiming("testcategory", 13000, { name: "LoadList" }); // name option is required
// or
tracker.trackTiming("testcategory", 13000, {
  name: "loadList",
  label: "v1.0.3"
});
```

### trackPurchaseEvent(product, transaction, eventCategory, eventAction)

* **product (required):** Object
  * **id (required):** String
  * **name (required):** String
  * **category (optional):** String
  * **brand (optional):** String
  * **variant (optional):** String
  * **price (optional):** Number
  * **quantity (optional):** Number
  * **couponCode (optional):** String
* **transaction (required):** Object
  * **id (required):** String
  * **affiliation (optional):** String, an entity with which the transaction should be affiliated (e.g. a particular store)
  * **revenue (optional):** Number
  * **tax (optional):** Number
  * **shipping (optional):** Number
  * **couponCode (optional):** String
* **eventCategory (required):** String, defaults to "Ecommerce"
* **eventAction (required):** String, defaults to "Purchase"

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/enhanced-ecommerce#measuring-transactions) for more info.

```javascript
tracker.trackPurchaseEvent(
  {
    id: "P12345",
    name: "Android Warhol T-Shirt",
    category: "Apparel/T-Shirts",
    brand: "Google",
    variant: "Black",
    price: 29.2,
    quantity: 1,
    couponCode: "APPARELSALE"
  },
  {
    id: "T12345",
    affiliation: "Google Store - Online",
    revenue: 37.39,
    tax: 2.85,
    shipping: 5.34,
    couponCode: "SUMMER2013"
  },
  "Ecommerce",
  "Purchase"
);
```

### trackMultiProductsPurchaseEvent(products, transaction, eventCategory, eventAction)

same as trackPurchaseEvent but instead of one product you can provide an Array of products

### trackMultiProductsPurchaseEventWithCustomDimensionValues(products, transaction, eventCategory, eventAction, dimensionIndexValueDict)

* **products (required):** Array, array of products
* **transaction (required):** Object, transaction object
* **eventCategory (required):** String, defaults to "Ecommerce"
* **eventAction (required):** String, defaults to "Purchase"
* **dimensionIndexValueDict (required):** Dict of dimension index / values.

```javascript
tracker.trackMultiProductsPurchaseEventWithCustomDimensionValues(
  [
    {
      id: "P12345",
      name: "Android Warhol T-Shirt",
      category: "Apparel/T-Shirts",
      brand: "Google",
      variant: "Black",
      price: 29.2,
      quantity: 1,
      couponCode: "APPARELSALE"
    },
    {
      id: "P54321",
      name: "IOS T-Shirt",
      category: "Apparel/T-Shirts",
      brand: "Apple",
      variant: "Black",
      price: 10.1,
      quantity: 1,
      couponCode: "APPARELSALE"
    }
  ],
  {
    id: "T12345",
    affiliation: "Store - Online",
    revenue: 52.5,
    tax: 7.86,
    shipping: 5.34,
    couponCode: "SUMMER2013"
  },
  "Ecommerce",
  "Purchase",
  { "1": "premium", "5": "foo" }
);
```

### trackException(error, fatal)

* **error:** String, a description of the exception (up to 100 characters), accepts nil
* **fatal (required):** Boolean, indicates whether the exception was fatal, defaults to false

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/exceptions) for more info.

```javascript
try {
  ...
} catch(error) {
  tracker.trackException(error.message, false);
}
```

### trackSocialInteraction(network, action, targetUrl)

* **network (required):** String, name of social network (e.g. 'Facebook', 'Twitter', 'Google+')
* **action (required):** String, social action (e.g. 'Like', 'Share', '+1')
* **targetUrl:** String, url of content being shared

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/social) docs for more info.

```javascript
tracker.trackSocialInteraction("Twitter", "Post");
```

### trackScreenViewWithCustomDimensionValues(screenName, dimensionIndexValueDict)

* **screenName (required):** String, name of current screen
* **dimensionIndexValueDict (required):** Dict of dimension index / values.

Tracks a screen view with one or more customDimensionValues. See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets) docs for more info.

```javascript
tracker.trackScreenViewWithCustomDimensionValues("Home", {
  "1": "premium",
  "5": "foo"
});
```

### trackEventWithCustomDimensionValues(category, action, optionalValues, dimensionIndexValueDict)

* **category (required):** String, category of event
* **action (required):** String, name of action
* **optionalValues:** Object
  * **label:** String
  * **value:** Number
* **dimensionIndexValueDict (required):** Dict of dimension index / values.

Tracks an event with one or more customDimensionValues. See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets) docs for more info.

```javascript
tracker.trackEventWithCustomDimensionValues(
  "testcategory",
  "testaction",
  { label: "v1.0.3", value: 22 },
  { "1": "premium", "5": "foo" }
);
```

### trackEventWithCustomDimensionAndMetricValues(category, action, optionalValues, dimensionIndexValueDict)

* **category (required):** String, category of event
* **action (required):** String, name of action
* **optionalValues:** Object
  * **label:** String
  * **value:** Number
* **dimensionIndexValueDict (required):** Dict of dimension index / values.
* **metricIndexValueDict (required):** Dict of metric index / values.

Tracks an event with one or more customDimensionValues and one or more customMetricValues. See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets) docs for more info.

```javascript
tracker.trackEventWithCustomDimensionAndMetricValues('testcategory', 'testaction', {label: 'v1.0.3', value: 22}, {'1':'premium', '5':'foo'}, , {'1': 3, '5': 4});
```

### setUser(userId)

* **userId (required):** String, an **anonymous** identifier that complies with Google Analytic's user ID policy

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/user-id) for more info.

```javascript
tracker.setUser("12345678");
```

### setClient(clientId)

* **clientId (required):** String, an **anonymous** identifier that complies with Google Analytic's client ID policy

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId) for more info.

```javascript
tracker.setClient("35009a79-1a05-49d7-b876-2b884d0f825b");
```

### getClientId()

This function lets you get the client id to be used for different purpose for logging etc.

* returns Promise

```javascript
tracker.clientId().then(clientId => console.log("Client id is: ", clientId));
```

### createNewSession(screenName)

* **screenName (required):** String, the current screen which the session started on

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/sessions#manual) for more info.

```javascript
tracker.createNewSession("HomeScreen");
```

### allowIDFA(enabled)

* **enabled (required):** Boolean, true to allow IDFA collection, defaults to `true`.

Also called advertising identifier collection, and is used for advertising features.

**Important**: For iOS you can only use this method if you have done the optional step 6 from the installation guide. Only enable this (and link the appropriate libraries) if you plan to use advertising features in your app, or else your app may get rejected from the AppStore.

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/campaigns#ios-install) for more info.

```javascript
tracker.allowIDFA(true);
```

### setTrackUncaughtExceptions(enabled)

* **enabled (required):** Boolean

Sets if uncaught exceptions should be tracked. This is enabled by default.

```javascript
tracker.setTrackUncaughtExceptions(true);
```

### setAnonymizeIp(enabled)

* **enabled (required):** Boolean

Sets if AnonymizeIp is enabled. This is disabled by default.
If enabled the last octet of the IP address will be removed.

```javascript
tracker.setAnonymizeIp(true);
```

### setAppName(appName)

* **appName (required):** String

Overrides the app name logged in Google Analytics. The Bundle name is used by default.
Note: This has to be set each time the App starts.

```javascript
tracker.setAppName("someAppName");
```

### setSamplingRate(ratio)

* **ratio (required):** Number Percentage 0 - 100

Sets tracker sampling rate.

```javascript
tracker.setSamplingRate(50);
```

### setCurrency(currencyCode)

* **currencyCode (required):** String, ISO 4217 currency code

Sets tracker currency property, see [Currency Codes](https://developers.google.com/analytics/devguides/platform/features/currencies).

```javascript
tracker.setCurrency("EUR");
```

### dispatch()

This function lets you manually dispatch all hits which are queued.
Use this function sparingly, as it will normally happen automatically as a batch.

* returns Promise

```javascript
tracker.dispatch().then(done => console.log("Dispatch is done: ", done));
```

### dispatchWithTimeout()

* **timeout (optional):** Number, in ms

The same as `dispatch()`, but also gives you the ability to time out the Promise in case dispatch takes too long.

* returns Promise

```javascript
tracker
  .dispatchWithTimeout(10000)
  .then(done => console.log("Dispatch is done: ", done));
```

## GoogleAnalyticsSettings API

Settings are applied across all trackers.

### setDryRun(enabled)

* **enabled (required):** Boolean, indicating if the `dryRun` flag should be enabled or not.

When enabled the native library prevents any data from being sent to Google Analytics. This allows you to test or debug the implementation, without your test data appearing in your Google Analytics reports.

```javascript
GoogleAnalyticsSettings.setDryRun(true);
```

### setDispatchInterval(intervalInSeconds)

* **intervalInSeconds (required):** Number, indicating how often dispatches should be sent

Events, screen views, etc, are sent in batches to your tracker. This function allows you to configure how often (in seconds) the batches are sent to your tracker. Recommended to keep this around 20-120 seconds to preserve battery and network traffic.
This is set to 20 seconds by default.

```javascript
GoogleAnalyticsSettings.setDispatchInterval(30);
```

### setOptOut(enabled)

* **enabled (required):** Boolean

Sets if OptOut is active and disables Google Analytics. This is disabled by default.
Note: This has to be set each time the App starts.

```javascript
GoogleAnalyticsSettings.setOptOut(true);
```

## GoogleTagManager API

```javascript
import { GoogleTagManager } from "react-native-google-analytics-bridge";
GoogleTagManager.openContainerWithId("GT-NZT48")
  .then(() => GoogleTagManager.stringForKey("pack"))
  .then(str => console.log("Pack: ", str));
```

Can only be used with one container. All methods returns a `Promise`.

### openContainerWithId(containerId)

* **containerId (required):** String, your container id.

**Important**: Call **once** to open the container for all subsequent static calls.

```javascript
GoogleTagManager.openContainerWithId('GT-NZT48')
.then((..) => ..)
```

### stringForKey(key)

##### Parameter(s)

* **key (required):** String

##### Returns:

* **value:** String

Retrieves a string with the given key from the opened container.

```javascript
GoogleTagManager.stringForKey("key").then(val => console.log(val));
```

### boolForKey(key)

##### Parameter(s)

* **key (required):** String

##### Returns:

* **value:** Boolean

Retrieves a boolean value with the given key from the opened container.

```javascript
GoogleTagManager.boolForKey("key").then(val => console.log(val));
```

### doubleForKey(key)

##### Parameter(s)

* **key (required):** String

##### Returns:

* **value:** Number

Retrieves a number with the given key from the opened container.

```javascript
GoogleTagManager.doubleForKey("key").then(val => console.log(val));
```

### pushDataLayerEvent(dictionary = {})

##### Parameter(s)

* **dictionary (required):** dictionary An Map<String, Object> containing key and value pairs.

##### Returns:

* **value:** Boolean

Push a DataLayer event for Google Analytics through Google Tag Manager.

```javascript
GoogleTagManager.pushDataLayerEvent({
  event: "eventName",
  pageId: "/home"
}).then(success => console.log(success));
```

### setVerboseLoggingEnabled(enabled)

##### Parameter(s)

* **enabled (required):** Boolean

##### Returns:

* **value:** Boolean

Sets logger to verbose, default is warning

```javascript
GoogleTagManager.setVerboseLoggingEnabled(true);
```
