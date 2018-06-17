<!-- DO NOT EDIT README.md (It will be overridden by README.hbs) -->

# GoogleAnalyticsBridge [![npm version](https://img.shields.io/npm/v/react-native-google-analytics-bridge.svg)](https://www.npmjs.com/package/react-native-google-analytics-bridge) [![Build Status](https://travis-ci.org/idehub/react-native-google-analytics-bridge.svg?branch=master)](https://travis-ci.org/idehub/react-native-google-analytics-bridge)

**Google Analytics Bridge** is built to provide an easy interface to the native Google Analytics libraries on both **iOS** and **Android**.

## Why a native bridge? Why not use just JavaScript?

The key difference with the native bridge is that you get a lot of the metadata handled automatically by the Google Analytics native library. This will include the device UUID, device model, viewport size, OS version etc.

You will only have to send in a few parameteres when tracking, e.g:

```javascript
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-12345-1');

tracker.trackScreenView('Home');
tracker.trackEvent('testcategory', 'testaction');
```

## Conflicting Google Play Services version on Android?

You can specify `googlePlayServicesVersion` in "android/gradle.properties". Otherwise, it will take default version

e.g.
`googlePlayServicesVersion=11.8.0`

## Problems with tracking? Visitors not showing up?

This is **NOT** (_normally_) an error with this library. Please read [this guide on how to set up your Google Analytics account/property](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Creating-a-Google-Analytics-property-for-mobile-analytics) for mobile analytics.

## Problems with android build failures?

Here I have mentioned the required steps to resolve the issues regarding the build failures, when you got updated your android studio [please check the following doc to clear the issues](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Solution-for-Android-build-failure-issues)

## Content

-   [Installation](#installation-and-linking-libraries)
-   [Manual installation](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Manual-installation)
-   [Usage](#usage)
-   [JavaScript API](#javascript-api)
-   [Troubleshooting](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Troubleshooting)
-   [A/B testing](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Simple-A-B-testing)
-   [Roadmap](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Roadmap)

## Installation and linking libraries

-   For React Native >= `0.40` use version `5.0.0` (and up) of this module.
-   For React Native &lt; `0.40` use version `4.0.3`.

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
} from 'react-native-google-analytics-bridge';

// The tracker must be constructed, and you can have multiple:
let tracker1 = new GoogleAnalyticsTracker('UA-12345-1');
let tracker2 = new GoogleAnalyticsTracker('UA-12345-2');

tracker1.trackScreenView('Home');
tracker1.trackEvent('Customer', 'New');

// The GoogleAnalyticsSettings is static, and settings are applied across all trackers:
GoogleAnalyticsSettings.setDispatchInterval(30);
// Setting `dryRun` to `true` lets you test tracking without sending data to GA 
GoogleAnalyticsSettings.setDryRun(true);

// GoogleTagManager is also static, and works only with one container. All functions here are Promises:
GoogleTagManager.openContainerWithId("GT-NZT48")
  .then(() => {
    return GoogleTagManager.stringForKey("pack");
  })
  .then((pack) => {
    console.log("Pack: ", pack);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Providing an existing GTM container

In some scenarios it might be helpful to provide an opened GTM container to the bridge. Some possible scenarios where this could be helpful:

-   You want to preload some config before loading the jsbundle. For instance checking an experiment variable to determine which jsbundle to load.
-   You have a brownfield app that mixes native UI and react native UI that should share the same container.
-   You want to try and make sure that the container is loaded before starting the app.

This will require that you are familiar with the native api for GTM on whatever platforms you want to support. Generally the process is to load your container at startup, and hold the creation of the react native bridge until the container is loaded. On iOS you can then initialize an RCTGoogleTagManagerBridge and set the container property. On Android the process is similar, but you will need to supply the ContainerHolder to the GoogleAnalyticsBridgePackage instead.

## JavaScript API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [GoogleAnalyticsSettings](#googleanalyticssettings)
    -   [setOptOut](#setoptout)
        -   [Parameters](#parameters)
        -   [Examples](#examples)
    -   [setDispatchInterval](#setdispatchinterval)
        -   [Parameters](#parameters-1)
        -   [Examples](#examples-1)
    -   [setDryRun](#setdryrun)
        -   [Parameters](#parameters-2)
        -   [Examples](#examples-2)
-   [GoogleAnalyticsTracker](#googleanalyticstracker)
    -   [Examples](#examples-3)
    -   [trackScreenView](#trackscreenview)
        -   [Parameters](#parameters-3)
        -   [Examples](#examples-4)
    -   [trackEvent](#trackevent)
        -   [Parameters](#parameters-4)
        -   [Examples](#examples-5)
    -   [trackTiming](#tracktiming)
        -   [Parameters](#parameters-5)
        -   [Examples](#examples-6)
    -   [trackException](#trackexception)
        -   [Parameters](#parameters-6)
        -   [Examples](#examples-7)
    -   [trackSocialInteraction](#tracksocialinteraction)
        -   [Parameters](#parameters-7)
        -   [Examples](#examples-8)
    -   [setUser](#setuser)
        -   [Parameters](#parameters-8)
        -   [Examples](#examples-9)
    -   [setClient](#setclient)
        -   [Parameters](#parameters-9)
        -   [Examples](#examples-10)
    -   [getClientId](#getclientid)
        -   [Examples](#examples-11)
    -   [allowIDFA](#allowidfa)
        -   [Parameters](#parameters-10)
        -   [Examples](#examples-12)
    -   [setAppName](#setappname)
        -   [Parameters](#parameters-11)
        -   [Examples](#examples-13)
    -   [setAppVersion](#setappversion)
        -   [Parameters](#parameters-12)
        -   [Examples](#examples-14)
    -   [setAnonymizeIp](#setanonymizeip)
        -   [Parameters](#parameters-13)
        -   [Examples](#examples-15)
    -   [setSamplingRate](#setsamplingrate)
        -   [Parameters](#parameters-14)
        -   [Examples](#examples-16)
    -   [setCurrency](#setcurrency)
        -   [Parameters](#parameters-15)
        -   [Examples](#examples-17)
    -   [setTrackUncaughtExceptions](#settrackuncaughtexceptions)
        -   [Parameters](#parameters-16)
    -   [dispatch](#dispatch)
        -   [Examples](#examples-18)
    -   [dispatchWithTimeout](#dispatchwithtimeout)
        -   [Parameters](#parameters-17)
        -   [Examples](#examples-19)
-   [GoogleTagManager](#googletagmanager)
    -   [Examples](#examples-20)
    -   [openContainerWithId](#opencontainerwithid)
        -   [Parameters](#parameters-18)
        -   [Examples](#examples-21)
    -   [boolForKey](#boolforkey)
        -   [Parameters](#parameters-19)
        -   [Examples](#examples-22)
    -   [stringForKey](#stringforkey)
        -   [Parameters](#parameters-20)
        -   [Examples](#examples-23)
    -   [doubleForKey](#doubleforkey)
        -   [Parameters](#parameters-21)
        -   [Examples](#examples-24)
    -   [pushDataLayerEvent](#pushdatalayerevent)
        -   [Parameters](#parameters-22)
        -   [Examples](#examples-25)
    -   [setVerboseLoggingEnabled](#setverboseloggingenabled)
        -   [Parameters](#parameters-23)
-   [CustomDimensionsFieldIndexMap](#customdimensionsfieldindexmap)
    -   [Examples](#examples-26)
-   [CustomDimensionsByIndex](#customdimensionsbyindex)
    -   [Examples](#examples-27)
-   [CustomMetrics](#custommetrics)
    -   [Examples](#examples-28)
-   [CustomDimensionsByField](#customdimensionsbyfield)
    -   [Examples](#examples-29)
-   [DataLayerEvent](#datalayerevent)
    -   [Parameters](#parameters-24)
    -   [Examples](#examples-30)
-   [HitPayload](#hitpayload)
    -   [Parameters](#parameters-25)
    -   [Examples](#examples-31)
-   [ProductActionEnum](#productactionenum)
-   [ProductAction](#productaction)
    -   [Parameters](#parameters-26)
    -   [Examples](#examples-32)
-   [Transaction](#transaction)
    -   [Parameters](#parameters-27)
    -   [Examples](#examples-33)
-   [Product](#product)
    -   [Parameters](#parameters-28)
    -   [Examples](#examples-34)

### GoogleAnalyticsSettings

Settings which are applied across all trackers.

#### setOptOut

Sets if OptOut is active and disables Google Analytics. This is disabled by default. Note: This has to be set each time the App starts.

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

##### Examples

```javascript
GoogleAnalyticsSettings.setOptOut(true);
```

#### setDispatchInterval

Sets the trackers dispatch interval.
Events, screen views, etc, are sent in batches to your tracker. This function allows you to configure how often (in seconds) the batches are sent to your tracker. Recommended to keep this around 20-120 seconds to preserve battery and network traffic. This is set to 20 seconds by default.

##### Parameters

-   `intervalInSeconds` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

##### Examples

```javascript
GoogleAnalyticsSettings.setDispatchInterval(30);
```

#### setDryRun

When enabled the native library prevents any data from being sent to Google Analytics. This allows you to test or debug the implementation, without your test data appearing in your Google Analytics reports.

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

##### Examples

```javascript
GoogleAnalyticsSettings.setDryRun(true);
```

### GoogleAnalyticsTracker

#### Examples

```javascript
// Constructing a tracker is simple:
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
const tracker = new GoogleAnalyticsTracker("UA-12345-1");
tracker.trackScreenView("Home");

// You can have multiple trackers if you have several tracking ids
const tracker2 = new GoogleAnalyticsTracker("UA-12345-2");
```

```javascript
// One optional feature as well is constructing a tracker with a CustomDimensionsFieldIndexMap, to map custom dimension field names to index keys:
const fieldIndexMap = { customerType: 1 };
const tracker3 = new GoogleAnalyticsTracker("UA-12345-3", fieldIndexMap);

// This is because the Google Analytics API expects custom dimensions to be tracked by index keys, and not field names.
// Here the underlying logic will transform the custom dimension, so what ends up being sent to GA is { 1: 'Premium' }:
tracker3.trackScreenView("Home", { customDimensions: { customerType: "Premium" } });

// If you do not use a CustomDimensionsFieldIndexMap, you will have to use index as keys instead for custom dimensions:
tracker.trackScreenView("Home", { customDimensions: { 1: "Premium" } });
```

#### trackScreenView

Track the current screen/view. Calling this will also set the "current view" for other calls.
 So events tracked will be tagged as having occured on the current view, `Home` in this example.
This means it is important to track navigation, especially if events can fire on different views.

##### Parameters

-   `screenName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The name of the current screen
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)

##### Examples

```javascript
tracker.trackScreenView('Home');
```

```javascript
// With payload:
const payload = { impressionList: "Sale", impressionProducts: [ { id: "PW928", name: "Premium bundle" } ] };
tracker.trackScreenView("SplashModal", payload);
```

#### trackEvent

Track an event that has occured

##### Parameters

-   `category` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The event category
-   `action` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The event action
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)
-   `label` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) An optional event label (optional, default `null`)
-   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional) An optional event value (optional, default `null`)

##### Examples

```javascript
tracker.trackEvent("DetailsButton", "Click");
```

```javascript
// Track event with label and value
tracker.trackEvent("AppVersionButton", "Click", null, label: "v1.0.3", value: 22 });
```

```javascript
// Track with a payload (ecommerce in this case):
const product = {
  id: "P12345",
  name: "Android Warhol T-Shirt",
  category: "Apparel/T-Shirts",
  brand: "Google",
  variant: "Black",
  price: 29.2,
  quantity: 1,
  couponCode: "APPARELSALE"
};
const transaction = {
  id: "T12345",
  affiliation: "Google Store - Online",
  revenue: 37.39,
  tax: 2.85,
  shipping: 5.34,
  couponCode: "SUMMER2013"
};
const productAction = {
  transaction,
  action: 7 // Purchase action, see ProductActionEnum
}
const payload = { products: [ product ], productAction: productAction }
tracker.trackEvent("FinalizeOrderButton", "Click", payload);
```

#### trackTiming

Track a timing measurement

##### Parameters

-   `category` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The event category
-   `interval` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Required) The timing measurement in milliseconds
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The timing name (optional, default `null`)
-   `label` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) An optional timing label (optional, default `null`)

##### Examples

```javascript
tracker.trackTiming("testcategory", 2000, null, "LoadList"); // name option is required
```

```javascript
// With label:
tracker.trackTiming("testcategory", 2000, null, "LoadList", "v1.0.3");
```

#### trackException

Track an exception

##### Parameters

-   `error` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The description of the error
-   `fatal` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** (Optional) A value indiciating if the error was fatal, defaults to false (optional, default `false`)
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)

##### Examples

```javascript
try {
  ...
} catch(error) {
  tracker.trackException(error.message, false);
}
```

#### trackSocialInteraction

Track a social interaction, Facebook, Twitter, etc.

##### Parameters

-   `network` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `action` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `targetUrl` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload

##### Examples

```javascript
tracker.trackSocialInteraction("Twitter", "Post");
```

#### setUser

Sets the current userId for tracking.

##### Parameters

-   `userId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** An anonymous identifier that complies with Google Analytic's user ID policy

##### Examples

```javascript
tracker.setUser("12345678");
```

#### setClient

Sets the current clientId for tracking.

##### Parameters

-   `clientId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** A anonymous identifier that complies with Google Analytic's client ID policy

##### Examples

```javascript
tracker.setClient("35009a79-1a05-49d7-b876-2b884d0f825b");
```

#### getClientId

Get the client id to be used for purpose of logging etc.

##### Examples

```javascript
tracker.getClientId().then(clientId => console.log("Client id is: ", clientId));
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

#### allowIDFA

Also called advertising identifier collection, and is used for advertising features.

**Important**: For iOS you can only use this method if you have done the optional step 6 from the installation guide. Only enable this (and link the appropriate libraries) if you plan to use advertising features in your app, or else your app may get rejected from the AppStore.

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** (Optional) Defaults to true (optional, default `true`)

##### Examples

```javascript
tracker.allowIDFA(true);
```

#### setAppName

Overrides the app name logged in Google Analytics. The Bundle name is used by default. Note: This has to be set each time the App starts.

##### Parameters

-   `appName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required)

##### Examples

```javascript
tracker.setAppName("YourAwesomeApp");
```

#### setAppVersion

Sets the trackers appVersion

##### Parameters

-   `appVersion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required)

##### Examples

```javascript
tracker.setAppVersion("1.3.2");
```

#### setAnonymizeIp

Sets if AnonymizeIp is enabled
If enabled the last octet of the IP address will be removed

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** (Required)

##### Examples

```javascript
tracker.setAnonymizeIp(true);
```

#### setSamplingRate

Sets tracker sampling rate.

##### Parameters

-   `sampleRatio` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Required) Percentage 0 - 100

##### Examples

```javascript
tracker.setSamplingRate(50);
```

#### setCurrency

Sets the currency for tracking.

##### Parameters

-   `currencyCode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The currency ISO 4217 code

##### Examples

```javascript
tracker.setCurrency("EUR");
```

#### setTrackUncaughtExceptions

Sets if uncaught exceptions should be tracked
Important to note: On iOS this option is set on all trackers. On Android it is set per tracker.
If you are using multiple trackers on iOS, this will enable & disable on all trackers.

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

#### dispatch

This function lets you manually dispatch all hits which are queued.
Use this function sparingly, as it will normally happen automatically
as a batch. This function will also dispatch for all trackers.

##### Examples

```javascript
tracker.dispatch().then(done => console.log("Dispatch is done: ", done));
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** Returns when done

#### dispatchWithTimeout

The same as `dispatch`, but also gives you the ability to time out
the Promise in case dispatch takes too long.

##### Parameters

-   `timeout` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The timeout. Default value is 15 sec. (optional, default `-1`)

##### Examples

```javascript
tracker
  .dispatchWithTimeout(10000)
  .then(done => console.log("Dispatch is done: ", done));
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** Returns when done or timed out

### GoogleTagManager

Can only be used with one container. All functions returns a Promise.

#### Examples

```javascript
import { GoogleTagManager } from "react-native-google-analytics-bridge";
GoogleTagManager.openContainerWithId("GT-NZT48")
  .then(() => GoogleTagManager.stringForKey("pack"))
  .then(str => console.log("Pack: ", str));
```

#### openContainerWithId

Call once to open the container for all subsequent static calls.

##### Parameters

-   `containerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

##### Examples

```javascript
GoogleTagManager.openContainerWithId('GT-NZT48').then((..) => ..)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** 

#### boolForKey

Retrieves a boolean value with the given key from the opened container.

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

##### Examples

```javascript
GoogleTagManager.boolForKey("key").then(val => console.log(val));
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** 

#### stringForKey

Retrieves a string with the given key from the opened container.

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

##### Examples

```javascript
GoogleTagManager.stringForKey("key").then(val => console.log(val));
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

#### doubleForKey

Retrieves a number with the given key from the opened container.

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

##### Examples

```javascript
GoogleTagManager.doubleForKey("key").then(val => console.log(val));
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** 

#### pushDataLayerEvent

Push a datalayer event for Google Analytics through Google Tag Manager. The event must have at least one key "event" with event name.

##### Parameters

-   `event` **[DataLayerEvent](#datalayerevent)** An Map&lt;String, Object> containing key and value pairs. It must have at least one key "event" with event name

##### Examples

```javascript
GoogleTagManager.pushDataLayerEvent({
  event: "eventName",
  pageId: "/home"
}).then(success => console.log(success));
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** 

#### setVerboseLoggingEnabled

Sets logger to verbose, default is warning

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### CustomDimensionsFieldIndexMap

-   **See: CustomDimensionsFieldIndexMap**
-   **See: CustomDimensionsByField**

A dictionary describing mapping of field names to indices for custom dimensions.
This is an optional object used by the tracker.

#### Examples

```javascript
// Create something like:
const fieldIndexMap = { customerType: 1 };
// Construct tracker with it:
const tracker = new GoogleAnalyticsTracker("UA-12345-3", fieldIndexMap);
// This allows you to send in customDimensions in the`HitPayload by field name instead of index:
tracker.trackScreenView("Home", { customDimensions: { customerType: "Premium" } });
// If you do not provide a map, you instead have to send in by index:
tracker.trackScreenView("Home", { customDimensions: { 1: "Premium" } });
```

### CustomDimensionsByIndex

-   **See: CustomDimensionsFieldIndexMap**
-   **See: CustomDimensionsByField**

A dictionary with custom dimensions values and their index keys.

#### Examples

```javascript
const customDimensions = { 1: "Premium", 3: "Beta", 5: 1200 }
tracker.trackScreenView("Home", { customDimensions });
```

### CustomMetrics

A dictionary with custom metric values and their index keys.

#### Examples

```javascript
const customMetrics = { 1: 2389, 4: 15000 }
tracker.trackScreenView("Home", { customMetrics });
```

### CustomDimensionsByField

-   **See: CustomDimensionsFieldIndexMap**
-   **See: CustomDimensionsByIndex**

A dictionary with custom dimensions values and their (mapped) field name keys.
In order to use this and send in custom dimensions by field name, you must have
provided a `CustomDimensionsFieldIndexMap` when constructing the tracker.

#### Examples

```javascript
const customDimensions = { customerType: "Premium", appType: "Beta", credit: 1200 }
tracker.trackScreenView("Home", { customDimensions });
```

### DataLayerEvent

The Google Tag Manager DataLayerEvent dictionary.

Populate this event-object with values to push to the DataLayer. The only required property is `event`.

#### Parameters

-   `event` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

#### Examples

```javascript
const dataLayerEvent = {
  event: "eventName",
  pageId: "/home"
};
GoogleTagManager.pushDataLayerEvent(dataLayerEvent);
```

### HitPayload

The HitPayload object and possible values

Used by the different tracking methods for adding metadata to the hit.

#### Parameters

-   `products` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Product](#product)>** (Optional) Used for ecommerce
-   `impressionProducts` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Product](#product)>** (Optional) Used for ecommerce
-   `impressionList` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) Used for ecommerce
-   `impressionSource` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) Used for ecommerce
-   `productAction` **[ProductAction](#productaction)** (Optional) Used for ecommerce
-   `customDimensions` **([CustomDimensionsByIndex](#customdimensionsbyindex) \| [CustomDimensionsByField](#customdimensionsbyfield))** (Optional)
-   `customMetrics` **[CustomMetrics](#custommetrics)** (Optional)
-   `utmCampaignUrl` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) Used for campaigns
-   `session` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) Only two possible values, "start" or "end". This will either start or end a session.

#### Examples

```javascript
// If you want to do send a purchase payload with an event:
const product = {
  id: "P12345",
  name: "Android Warhol T-Shirt",
  category: "Apparel/T-Shirts",
  brand: "Google",
  variant: "Black",
  price: 29.2,
  quantity: 1,
  couponCode: "APPARELSALE"
};
const transaction = {
  id: "T12345",
  affiliation: "Google Store - Online",
  revenue: 37.39,
  tax: 2.85,
  shipping: 5.34,
  couponCode: "SUMMER2013"
};
const productAction = {
  transaction,
  action: 7 // Purchase action, see ProductActionEnum
}
const payload = { products: [ product ], productAction: productAction }
tracker.trackEvent("FinalizeOrderButton", "Click", payload);
```

```javascript
// If you want to send custom dimensions with a screen view:
const customDimensions = {
  1: "Beta",
  3: "Premium"
};
const payload = { customDimensions };
tracker.trackScreenView("SaleScreen", payload);
```

### ProductActionEnum

Enhanced Ecommerce ProductActionEnum

Used by `ProductAction` when describing the type of product action. The possible values (numbers) are:

-   Detail = 1,
-   Click = 2,
-   Add = 3,
-   Remove = 4,
-   Checkout = 5,
-   CheckoutOption = 6,
-   Purchase = 7,
-   Refund = 8

### ProductAction

Enhanced Ecommerce Product Action

Used by `HitPayload` when describing a product action

#### Parameters

-   `action` **[ProductActionEnum](#productactionenum)** 
-   `transaction` **[Transaction](#transaction)** (Optional)
-   `checkoutStep` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional)
-   `checkoutOption` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)
-   `productActionList` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)
-   `productListSource` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)

#### Examples

```javascript
const productAction = {
  transaction,
  action: 7 // Purchase action, see ProductActionEnum
}
```

```javascript
const productAction = {
  action: 3 // Add action, see ProductActionEnum
}
```

### Transaction

Enhanced Ecommerce Transaction

Used by `ProductAction` when populating describing a purchase/transaction

#### Parameters

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `affiliation` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)
-   `revenue` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional - but not really)
-   `tax` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional)
-   `shipping` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional)
-   `couponCode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)

#### Examples

```javascript
const transaction = {
  id: "T12345",
  affiliation: "Google Store - Online",
  revenue: 37.39,
  tax: 2.85,
  shipping: 5.34,
  couponCode: "SUMMER2013"
};
```

### Product

Enhanced Ecommerce Product

Used by `HitPayload` when populating product actions or impressions

#### Parameters

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `category` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)
-   `brand` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)
-   `variant` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)
-   `price` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional)
-   `couponCode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional)
-   `quantity` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional)

#### Examples

```javascript
const product = {
  id: "P12345",
  name: "Android Warhol T-Shirt",
  category: "Apparel/T-Shirts",
  brand: "Google",
  variant: "Black",
  price: 29.2,
  quantity: 1,
  couponCode: "APPARELSALE"
};
```
