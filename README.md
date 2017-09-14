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

-   [CustomDimensionsFieldIndexMap](#customdimensionsfieldindexmap)
    -   [Examples](#examples)
-   [CustomMetrics](#custommetrics)
    -   [Examples](#examples-1)
-   [CustomDimensionsByIndex](#customdimensionsbyindex)
    -   [Examples](#examples-2)
-   [CustomDimensionsByField](#customdimensionsbyfield)
    -   [Examples](#examples-3)
-   [DataLayerEvent](#datalayerevent)
    -   [Parameters](#parameters)
-   [GoogleAnalyticsSettings](#googleanalyticssettings)
    -   [setOptOut](#setoptout)
        -   [Parameters](#parameters-1)
    -   [setDispatchInterval](#setdispatchinterval)
        -   [Parameters](#parameters-2)
    -   [setDryRun](#setdryrun)
        -   [Parameters](#parameters-3)
-   [GoogleAnalyticsTracker](#googleanalyticstracker)
    -   [Parameters](#parameters-4)
    -   [trackScreenView](#trackscreenview)
        -   [Parameters](#parameters-5)
        -   [Examples](#examples-4)
    -   [trackEvent](#trackevent)
        -   [Parameters](#parameters-6)
    -   [trackTiming](#tracktiming)
        -   [Parameters](#parameters-7)
    -   [trackException](#trackexception)
        -   [Parameters](#parameters-8)
    -   [trackSocialInteraction](#tracksocialinteraction)
        -   [Parameters](#parameters-9)
    -   [setUser](#setuser)
        -   [Parameters](#parameters-10)
    -   [setClient](#setclient)
        -   [Parameters](#parameters-11)
    -   [allowIDFA](#allowidfa)
        -   [Parameters](#parameters-12)
    -   [setAppName](#setappname)
        -   [Parameters](#parameters-13)
    -   [setAppVersion](#setappversion)
        -   [Parameters](#parameters-14)
    -   [setAnonymizeIp](#setanonymizeip)
        -   [Parameters](#parameters-15)
    -   [setSamplingRate](#setsamplingrate)
        -   [Parameters](#parameters-16)
    -   [setCurrency](#setcurrency)
        -   [Parameters](#parameters-17)
    -   [setTrackUncaughtExceptions](#settrackuncaughtexceptions)
        -   [Parameters](#parameters-18)
-   [GoogleTagManager](#googletagmanager)
    -   [openContainerWithId](#opencontainerwithid)
        -   [Parameters](#parameters-19)
    -   [boolForKey](#boolforkey)
        -   [Parameters](#parameters-20)
    -   [stringForKey](#stringforkey)
        -   [Parameters](#parameters-21)
    -   [doubleForKey](#doubleforkey)
        -   [Parameters](#parameters-22)
    -   [pushDataLayerEvent](#pushdatalayerevent)
        -   [Parameters](#parameters-23)
-   [HitPayload](#hitpayload)
    -   [Parameters](#parameters-24)
-   [ProductActionEnum](#productactionenum)
-   [Transaction](#transaction)
    -   [Parameters](#parameters-25)
-   [Product](#product)
    -   [Parameters](#parameters-26)
-   [ProductAction](#productaction)
    -   [Parameters](#parameters-27)

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

### CustomMetrics

A dictionary with custom metric values and their index keys.

#### Examples

```javascript
const customMetrics = { 1: 2389, 4: 15000 }
tracker.trackScreenView("Home", { customMetrics });
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

The only required property is event.

#### Parameters

-   `event` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### GoogleAnalyticsSettings

#### setOptOut

Sets if OptOut is active and disables Google Analytics
This has to be set each time the App starts

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

#### setDispatchInterval

Sets the trackers dispatch interval
This will influence how often batches of events, screen views, etc
are sent to your tracker.

##### Parameters

-   `intervalInSeconds` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

#### setDryRun

Sets if the tracker should have dry run enabled.
If dry run is enabled, no analytics data will be sent to your tracker.

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### GoogleAnalyticsTracker

#### Parameters

-   `trackerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Your tracker id, something like: UA-12345-1
-   `customDimensionsFieldsIndexMap` **{fieldName: fieldIndex}** Custom dimensions field/index pairs

#### trackScreenView

Track the current screen/view. Calling this will also set the "current view" for other calls.
 So events tracked will be tagged as having occured on the current view, `Home` in this example.
This means it is important to track navigation, especially if events can fire on different views.

##### Parameters

-   `screenName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The name of the current screen
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)

##### Examples

```javascript
tracker.trackScreenView('Home')
```

#### trackEvent

Track an event that has occured

##### Parameters

-   `category` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The event category
-   `action` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The event action
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)
-   `label` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) An optional event label (optional, default `null`)
-   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional) An optional event value (optional, default `null`)

#### trackTiming

Track an event that has occured

##### Parameters

-   `category` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The event category
-   `interval` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Required) The timing measurement in milliseconds
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The timing name (optional, default `null`)
-   `label` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Optional) An optional timing label (optional, default `null`)

#### trackException

Track an exception

##### Parameters

-   `error` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The description of the error
-   `fatal` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** (Optional) A value indiciating if the error was fatal, defaults to false (optional, default `false`)
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload (optional, default `null`)

#### trackSocialInteraction

Track a social interaction, Facebook, Twitter, etc.

##### Parameters

-   `network` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `action` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `targetUrl` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `payload` **[HitPayload](#hitpayload)** (Optional) An object containing the hit payload

#### setUser

Sets the current userId for tracking.

##### Parameters

-   `userId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The current userId

#### setClient

Sets the current clientId for tracking.

##### Parameters

-   `clientId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The current userId

#### allowIDFA

Sets if IDFA (identifier for advertisers) collection should be enabled

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** (Optional) Defaults to true (optional, default `true`)

#### setAppName

Sets the trackers appName
The Bundle name is used by default

##### Parameters

-   `appName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required)

#### setAppVersion

Sets the trackers appVersion

##### Parameters

-   `appVersion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required)

#### setAnonymizeIp

Sets if AnonymizeIp is enabled
If enabled the last octet of the IP address will be removed

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** (Required)

#### setSamplingRate

Sets tracker sampling rate.

##### Parameters

-   `sampleRatio` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Required) Percentage 0 - 100

#### setCurrency

Sets the currency for tracking.

##### Parameters

-   `currencyCode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (Required) The currency ISO 4217 code

#### setTrackUncaughtExceptions

Sets if uncaught exceptions should be tracked
Important to note: On iOS this option is set on all trackers. On Android it is set per tracker.
If you are using multiple trackers on iOS, this will enable & disable on all trackers.

##### Parameters

-   `enabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### GoogleTagManager

#### openContainerWithId

Call once to open the container for all subsequent static calls.

##### Parameters

-   `containerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** 

#### boolForKey

Retrieves a boolean value with the given key from the opened container.

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** 

#### stringForKey

Retrieves a string with the given key from the opened container.

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

#### doubleForKey

Retrieves a number with the given key from the opened container.

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** 

#### pushDataLayerEvent

Push a datalayer event for Google Analytics through Google Tag Manager. The event must have at least one key "event" with event name.
You can add optional values on top of that, example: {event: "eventName", pageId: "/home"}

##### Parameters

-   `event` **[DataLayerEvent](#datalayerevent)** An Map&lt;String, Object> containing key and value pairs. It must have at least one key "event" with event name

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>** 

### HitPayload

The HitPayload object and possible values

#### Parameters

-   `products` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Product](#product)>** 
-   `impressionProducts` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Product](#product)>** 
-   `impressionList` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `impressionSource` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `productAction` **[ProductAction](#productaction)** 
-   `customDimensions` **([CustomDimensionsByIndex](#customdimensionsbyindex) \| [CustomDimensionsByField](#customdimensionsbyfield))** 
-   `customMetrics` **[CustomMetrics](#custommetrics)** 
-   `utmCampaignUrl` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `startSession` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### ProductActionEnum

Ecommerce ProductActionEnum

The type of Product Action. The possible values (numbers) are:
Detail = 1,
Click = 2,
Add = 3,
Remove = 4,
Checkout = 5,
CheckoutOption = 6,
Purchase = 7,
Refund = 8

### Transaction

Ecommerce Transaction

#### Parameters

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `affiliation` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `revenue` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `tax` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `shipping` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `couponCode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### Product

Ecommerce Product

#### Parameters

-   `event` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `category` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `brand` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `variant` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `price` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `couponCode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `quantity` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### ProductAction

Ecommerce Product Action

#### Parameters

-   `action` **[ProductActionEnum](#productactionenum)** 
-   `transaction` **[Transaction](#transaction)** 
-   `checkoutStep` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `checkoutOption` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `productActionList` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `productListSource` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
