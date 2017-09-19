GoogleAnalyticsBridge [![npm version](https://img.shields.io/npm/v/react-native-google-analytics-bridge.svg)](https://www.npmjs.com/package/react-native-google-analytics-bridge) [![Build Status](https://travis-ci.org/idehub/react-native-google-analytics-bridge.svg?branch=master)](https://travis-ci.org/idehub/react-native-google-analytics-bridge)
=============
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
>The most limiting thing about Expo is that you can’t add in your own native modules without `detach`ing and using ExpoKit. 

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

## JavaScript API
There are three classes which can be imported from the `react-native-google-analytics-bridge` module.

## Classes

<dl>
<dt><a href="#CustomDimensionsFieldIndexMap">CustomDimensionsFieldIndexMap</a></dt>
<dd></dd>
<dt><a href="#CustomDimensionsByIndex">CustomDimensionsByIndex</a></dt>
<dd></dd>
<dt><a href="#CustomDimensionsByField">CustomDimensionsByField</a></dt>
<dd></dd>
<dt><a href="#CustomMetrics">CustomMetrics</a></dt>
<dd></dd>
<dt><a href="#GoogleAnalyticsSettings">GoogleAnalyticsSettings</a></dt>
<dd></dd>
<dt><a href="#GoogleAnalyticsTracker">GoogleAnalyticsTracker</a></dt>
<dd></dd>
<dt><a href="#GoogleTagManager">GoogleTagManager</a></dt>
<dd></dd>
<dt><a href="#HitPayload">HitPayload</a></dt>
<dd></dd>
<dt><a href="#Hit">Hit</a></dt>
<dd></dd>
<dt><a href="#ScreenHit">ScreenHit</a> ⇐ <code><a href="#Hit">Hit</a></code></dt>
<dd></dd>
<dt><a href="#EventHit">EventHit</a> ⇐ <code><a href="#Hit">Hit</a></code></dt>
<dd></dd>
<dt><a href="#TimingHit">TimingHit</a> ⇐ <code><a href="#Hit">Hit</a></code></dt>
<dd></dd>
<dt><a href="#ExceptionHit">ExceptionHit</a> ⇐ <code><a href="#Hit">Hit</a></code></dt>
<dd></dd>
<dt><a href="#SocialHit">SocialHit</a> ⇐ <code><a href="#Hit">Hit</a></code></dt>
<dd></dd>
<dt><a href="#NewGoogleAnalyticsTracker">NewGoogleAnalyticsTracker</a></dt>
<dd></dd>
</dl>

<a name="CustomDimensionsFieldIndexMap"></a>

## CustomDimensionsFieldIndexMap
**Kind**: global class  
**Export**:   
<a name="CustomDimensionsByIndex"></a>

## CustomDimensionsByIndex
**Kind**: global class  
**Export**:   
<a name="CustomDimensionsByField"></a>

## CustomDimensionsByField
**Kind**: global class  
**Export**:   
<a name="CustomMetrics"></a>

## CustomMetrics
**Kind**: global class  
**Export**:   
<a name="GoogleAnalyticsSettings"></a>

## GoogleAnalyticsSettings
**Kind**: global class  

* [GoogleAnalyticsSettings](#GoogleAnalyticsSettings)
    * [.setOptOut(enabled)](#GoogleAnalyticsSettings.setOptOut)
    * [.setDispatchInterval(intervalInSeconds)](#GoogleAnalyticsSettings.setDispatchInterval)
    * [.setDryRun(enabled)](#GoogleAnalyticsSettings.setDryRun)

<a name="GoogleAnalyticsSettings.setOptOut"></a>

### GoogleAnalyticsSettings.setOptOut(enabled)
Sets if OptOut is active and disables Google Analytics
This has to be set each time the App starts

**Kind**: static method of [<code>GoogleAnalyticsSettings</code>](#GoogleAnalyticsSettings)  

| Param | Type |
| --- | --- |
| enabled | <code>boolean</code> | 

<a name="GoogleAnalyticsSettings.setDispatchInterval"></a>

### GoogleAnalyticsSettings.setDispatchInterval(intervalInSeconds)
Sets the trackers dispatch interval
This will influence how often batches of events, screen views, etc
are sent to your tracker.

**Kind**: static method of [<code>GoogleAnalyticsSettings</code>](#GoogleAnalyticsSettings)  

| Param | Type |
| --- | --- |
| intervalInSeconds | <code>number</code> | 

<a name="GoogleAnalyticsSettings.setDryRun"></a>

### GoogleAnalyticsSettings.setDryRun(enabled)
Sets if the tracker should have dry run enabled.
If dry run is enabled, no analytics data will be sent to your tracker.

**Kind**: static method of [<code>GoogleAnalyticsSettings</code>](#GoogleAnalyticsSettings)  

| Param | Type |
| --- | --- |
| enabled | <code>boolean</code> | 

<a name="GoogleAnalyticsTracker"></a>

## GoogleAnalyticsTracker
**Kind**: global class  

* [GoogleAnalyticsTracker](#GoogleAnalyticsTracker)
    * [new GoogleAnalyticsTracker(trackerId, customDimensionsFieldsIndexMap)](#new_GoogleAnalyticsTracker_new)
    * [.trackScreenView(screenName, payload)](#GoogleAnalyticsTracker+trackScreenView)
    * [.trackEvent(category, action, payload, label, value)](#GoogleAnalyticsTracker+trackEvent)
    * [.trackTiming(category, interval, payload, name, label)](#GoogleAnalyticsTracker+trackTiming)
    * [.trackException(error, fatal, payload)](#GoogleAnalyticsTracker+trackException)
    * [.trackSocialInteraction(network, action, targetUrl, payload)](#GoogleAnalyticsTracker+trackSocialInteraction)
    * [.setUser(userId)](#GoogleAnalyticsTracker+setUser)
    * [.setClient(clientId)](#GoogleAnalyticsTracker+setClient)
    * [.allowIDFA(enabled)](#GoogleAnalyticsTracker+allowIDFA)
    * [.setAppName(appName)](#GoogleAnalyticsTracker+setAppName)
    * [.setAppVersion(appVersion)](#GoogleAnalyticsTracker+setAppVersion)
    * [.setAnonymizeIp(enabled)](#GoogleAnalyticsTracker+setAnonymizeIp)
    * [.setSamplingRate(sampleRatio)](#GoogleAnalyticsTracker+setSamplingRate)
    * [.setCurrency(currencyCode)](#GoogleAnalyticsTracker+setCurrency)
    * [.setTrackUncaughtExceptions(enabled)](#GoogleAnalyticsTracker+setTrackUncaughtExceptions)

<a name="new_GoogleAnalyticsTracker_new"></a>

### new GoogleAnalyticsTracker(trackerId, customDimensionsFieldsIndexMap)
Save all tracker related data that is needed to call native methods with proper data.


| Param | Type | Description |
| --- | --- | --- |
| trackerId | <code>string</code> | Your tracker id, something like: UA-12345-1 |
| customDimensionsFieldsIndexMap | <code>Object</code> | Custom dimensions field/index pairs |

**Example**  
```js
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-12345-1');
```
<a name="GoogleAnalyticsTracker+trackScreenView"></a>

### tracker.trackScreenView(screenName, payload)
**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| screenName | <code>string</code> |  | (Required) The name of the current screen |
| payload | <code>Object</code> | <code></code> | (Optional) An object containing the hit payload |

**Example**  
```js
tracker.trackScreenView('Home')
```
Track the current screen/view. Calling this will also set the "current view" for other calls.
 So events tracked will be tagged as having occured on the current view, `Home` in this example.
This means it is important to track navigation, especially if events can fire on different views.
<a name="GoogleAnalyticsTracker+trackEvent"></a>

### tracker.trackEvent(category, action, payload, label, value)
Track an event that has occured

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| category | <code>string</code> |  | (Required) The event category |
| action | <code>string</code> |  | (Required) The event action |
| payload | <code>Object</code> | <code></code> | (Optional) An object containing the hit payload |
| label | <code>string</code> | <code>null</code> | (Optional) An optional event label |
| value | <code>number</code> | <code></code> | (Optional) An optional event value |

<a name="GoogleAnalyticsTracker+trackTiming"></a>

### tracker.trackTiming(category, interval, payload, name, label)
Track an event that has occured

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| category | <code>string</code> |  | (Required) The event category |
| interval | <code>number</code> |  | (Required) The timing measurement in milliseconds |
| payload | <code>Object</code> | <code></code> | (Optional) An object containing the hit payload |
| name | <code>string</code> | <code>null</code> | (Required) The timing name |
| label | <code>string</code> | <code>null</code> | (Optional) An optional timing label |

<a name="GoogleAnalyticsTracker+trackException"></a>

### tracker.trackException(error, fatal, payload)
Track an exception

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| error | <code>string</code> |  | (Required) The description of the error |
| fatal | <code>boolean</code> | <code>false</code> | (Optional) A value indiciating if the error was fatal, defaults to false |
| payload | <code>Object</code> | <code></code> | (Optional) An object containing the hit payload |

<a name="GoogleAnalyticsTracker+trackSocialInteraction"></a>

### tracker.trackSocialInteraction(network, action, targetUrl, payload)
Track a social interaction, Facebook, Twitter, etc.

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> |  |
| action | <code>string</code> |  |
| targetUrl | <code>string</code> |  |
| payload | <code>Object</code> | (Optional) An object containing the hit payload |

<a name="GoogleAnalyticsTracker+setUser"></a>

### tracker.setUser(userId)
Sets the current userId for tracking.

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The current userId |

<a name="GoogleAnalyticsTracker+setClient"></a>

### tracker.setClient(clientId)
Sets the current clientId for tracking.

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| clientId | <code>string</code> | The current userId |

<a name="GoogleAnalyticsTracker+allowIDFA"></a>

### tracker.allowIDFA(enabled)
Sets if IDFA (identifier for advertisers) collection should be enabled

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>boolean</code> | <code>true</code> | (Optional) Defaults to true |

<a name="GoogleAnalyticsTracker+setAppName"></a>

### tracker.setAppName(appName)
Sets the trackers appName
The Bundle name is used by default

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| appName | <code>string</code> | (Required) |

<a name="GoogleAnalyticsTracker+setAppVersion"></a>

### tracker.setAppVersion(appVersion)
Sets the trackers appVersion

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| appVersion | <code>string</code> | (Required) |

<a name="GoogleAnalyticsTracker+setAnonymizeIp"></a>

### tracker.setAnonymizeIp(enabled)
Sets if AnonymizeIp is enabled
If enabled the last octet of the IP address will be removed

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | (Required) |

<a name="GoogleAnalyticsTracker+setSamplingRate"></a>

### tracker.setSamplingRate(sampleRatio)
Sets tracker sampling rate.

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| sampleRatio | <code>number</code> | (Required) Percentage 0 - 100 |

<a name="GoogleAnalyticsTracker+setCurrency"></a>

### tracker.setCurrency(currencyCode)
Sets the currency for tracking.

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| currencyCode | <code>string</code> | (Required) The currency ISO 4217 code |

<a name="GoogleAnalyticsTracker+setTrackUncaughtExceptions"></a>

### tracker.setTrackUncaughtExceptions(enabled)
Sets if uncaught exceptions should be tracked
Important to note: On iOS this option is set on all trackers. On Android it is set per tracker.
If you are using multiple trackers on iOS, this will enable & disable on all trackers.

**Kind**: instance method of [<code>GoogleAnalyticsTracker</code>](#GoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| enabled | <code>boolean</code> | 

<a name="GoogleTagManager"></a>

## GoogleTagManager
**Kind**: global class  

* [GoogleTagManager](#GoogleTagManager)
    * [.openContainerWithId(containerId)](#GoogleTagManager.openContainerWithId) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.boolForKey(key)](#GoogleTagManager.boolForKey) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.stringForKey(key)](#GoogleTagManager.stringForKey) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.doubleForKey(key)](#GoogleTagManager.doubleForKey) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.pushDataLayerEvent(event)](#GoogleTagManager.pushDataLayerEvent) ⇒ <code>Promise.&lt;boolean&gt;</code>

<a name="GoogleTagManager.openContainerWithId"></a>

### GoogleTagManager.openContainerWithId(containerId) ⇒ <code>Promise.&lt;boolean&gt;</code>
Call once to open the container for all subsequent static calls.

**Kind**: static method of [<code>GoogleTagManager</code>](#GoogleTagManager)  

| Param | Type |
| --- | --- |
| containerId | <code>string</code> | 

<a name="GoogleTagManager.boolForKey"></a>

### GoogleTagManager.boolForKey(key) ⇒ <code>Promise.&lt;boolean&gt;</code>
Retrieves a boolean value with the given key from the opened container.

**Kind**: static method of [<code>GoogleTagManager</code>](#GoogleTagManager)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="GoogleTagManager.stringForKey"></a>

### GoogleTagManager.stringForKey(key) ⇒ <code>Promise.&lt;string&gt;</code>
Retrieves a string with the given key from the opened container.

**Kind**: static method of [<code>GoogleTagManager</code>](#GoogleTagManager)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="GoogleTagManager.doubleForKey"></a>

### GoogleTagManager.doubleForKey(key) ⇒ <code>Promise.&lt;number&gt;</code>
Retrieves a number with the given key from the opened container.

**Kind**: static method of [<code>GoogleTagManager</code>](#GoogleTagManager)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="GoogleTagManager.pushDataLayerEvent"></a>

### GoogleTagManager.pushDataLayerEvent(event) ⇒ <code>Promise.&lt;boolean&gt;</code>
Push a datalayer event for Google Analytics through Google Tag Manager. The event must have at least one key "event" with event name.
You can add optional values on top of that, example: {event: "eventName", pageId: "/home"}

**Kind**: static method of [<code>GoogleTagManager</code>](#GoogleTagManager)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | An Map<String, Object> containing key and value pairs. It must have at least one key "event" with event name |

<a name="HitPayload"></a>

## HitPayload
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| products | <code>Array.&lt;Product&gt;</code> | (Optional) Products which an action has occured on. |
| productAction | <code>ProductAction</code> | (Optional) The action which occured on the products. Required if `products` is not empty. |
| impressionProducts | <code>Array.&lt;Product&gt;</code> | (Optional) Products which has had an impression. |
| impressionList | <code>string</code> | (Optional) The list which product impressions occured on. Required if `impressionProducts` is not empty. |
| impressionSource | <code>string</code> | (Optional) The source which impression occured from (Android only). |
| customDimensions | [<code>CustomDimensionsByIndex</code>](#CustomDimensionsByIndex) \| [<code>CustomDimensionsByField</code>](#CustomDimensionsByField) | (Optional) Custom dimensions. |
| customMetrics | [<code>CustomMetrics</code>](#CustomMetrics) | (Optional) Custom metrics. |
| utmCampaignUrl | <code>string</code> | (Optional) UTM campaign URL. |
| startSession | <code>number</code> | (Optional) Start new session. |


* [HitPayload](#HitPayload)
    * [new HitPayload()](#new_HitPayload_new)
    * [.addProduct(product)](#HitPayload+addProduct) ⇒ [<code>HitPayload</code>](#HitPayload)
    * [.addProductImpression(product)](#HitPayload+addProductImpression) ⇒ [<code>HitPayload</code>](#HitPayload)

<a name="new_HitPayload_new"></a>

### new HitPayload()
All properties on the payload is optional. Preferably leave them empty unless you actually need to send something extra.

<a name="HitPayload+addProduct"></a>

### payload.addProduct(product) ⇒ [<code>HitPayload</code>](#HitPayload)
Adds a product in the payload.
`productAction` must also be set on the payload if you add products.

**Kind**: instance method of [<code>HitPayload</code>](#HitPayload)  

| Param | Type |
| --- | --- |
| product | <code>Product</code> | 

<a name="HitPayload+addProductImpression"></a>

### payload.addProductImpression(product) ⇒ [<code>HitPayload</code>](#HitPayload)
Adds a product impression.
`impressionList` must also be set on the payload if you add impression products.

**Kind**: instance method of [<code>HitPayload</code>](#HitPayload)  

| Param | Type |
| --- | --- |
| product | <code>Product</code> | 

<a name="Hit"></a>

## Hit
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| payload | [<code>HitPayload</code>](#HitPayload) | <code></code> | (Optional) Payload to send with the hit. |

<a name="new_Hit_new"></a>

### new Hit()
Base class for all Hits.

<a name="ScreenHit"></a>

## ScreenHit ⇐ [<code>Hit</code>](#Hit)
**Kind**: global class  
**Extends**: [<code>Hit</code>](#Hit)  
**Export**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| screenName | <code>string</code> | The current screen name. |


* [ScreenHit](#ScreenHit) ⇐ [<code>Hit</code>](#Hit)
    * [.ScreenHit](#ScreenHit.ScreenHit)
        * [new ScreenHit(screenName)](#new_ScreenHit.ScreenHit_new)

<a name="ScreenHit.ScreenHit"></a>

### ScreenHit.ScreenHit
**Kind**: static class of [<code>ScreenHit</code>](#ScreenHit)  
<a name="new_ScreenHit.ScreenHit_new"></a>

#### new ScreenHit(screenName)
Creates an instance of ScreenHit.


| Param | Type |
| --- | --- |
| screenName | <code>string</code> | 

<a name="EventHit"></a>

## EventHit ⇐ [<code>Hit</code>](#Hit)
**Kind**: global class  
**Extends**: [<code>Hit</code>](#Hit)  
**Export**:   
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| category | <code>string</code> |  | The event category |
| action | <code>string</code> |  | The event action |
| label | <code>string</code> | <code>null</code> | The event label |
| value | <code>number</code> | <code></code> | The event value |


* [EventHit](#EventHit) ⇐ [<code>Hit</code>](#Hit)
    * [.EventHit](#EventHit.EventHit)
        * [new EventHit(category, action, [label], [value])](#new_EventHit.EventHit_new)

<a name="EventHit.EventHit"></a>

### EventHit.EventHit
**Kind**: static class of [<code>EventHit</code>](#EventHit)  
<a name="new_EventHit.EventHit_new"></a>

#### new EventHit(category, action, [label], [value])
Creates an instance of EventHit.


| Param | Type | Default |
| --- | --- | --- |
| category | <code>string</code> |  | 
| action | <code>string</code> |  | 
| [label] | <code>string</code> | <code>null</code> | 
| [value] | <code>number</code> | <code></code> | 

<a name="TimingHit"></a>

## TimingHit ⇐ [<code>Hit</code>](#Hit)
**Kind**: global class  
**Extends**: [<code>Hit</code>](#Hit)  
**Export**:   
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| category | <code>string</code> |  | The timing category |
| interval | <code>number</code> |  | The timing interval |
| name | <code>string</code> |  | The timing name |
| label | <code>string</code> | <code>null</code> | The timing label |


* [TimingHit](#TimingHit) ⇐ [<code>Hit</code>](#Hit)
    * [.TimingHit](#TimingHit.TimingHit)
        * [new TimingHit(category, interval, name, [label])](#new_TimingHit.TimingHit_new)

<a name="TimingHit.TimingHit"></a>

### TimingHit.TimingHit
**Kind**: static class of [<code>TimingHit</code>](#TimingHit)  
<a name="new_TimingHit.TimingHit_new"></a>

#### new TimingHit(category, interval, name, [label])
Creates an instance of TimingHit.


| Param | Type | Default |
| --- | --- | --- |
| category | <code>string</code> |  | 
| interval | <code>number</code> |  | 
| name | <code>string</code> |  | 
| [label] | <code>string</code> | <code>null</code> | 

<a name="ExceptionHit"></a>

## ExceptionHit ⇐ [<code>Hit</code>](#Hit)
**Kind**: global class  
**Extends**: [<code>Hit</code>](#Hit)  
**Export**:   
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| error | <code>string</code> |  | The error |
| fatal | <code>boolean</code> | <code>false</code> | If the error was fatal. Defaults to false. |


* [ExceptionHit](#ExceptionHit) ⇐ [<code>Hit</code>](#Hit)
    * [.ExceptionHit](#ExceptionHit.ExceptionHit)
        * [new ExceptionHit(error, [fatal])](#new_ExceptionHit.ExceptionHit_new)

<a name="ExceptionHit.ExceptionHit"></a>

### ExceptionHit.ExceptionHit
**Kind**: static class of [<code>ExceptionHit</code>](#ExceptionHit)  
<a name="new_ExceptionHit.ExceptionHit_new"></a>

#### new ExceptionHit(error, [fatal])
Creates an instance of ExceptionHit.


| Param | Type | Default |
| --- | --- | --- |
| error | <code>string</code> |  | 
| [fatal] | <code>boolean</code> | <code>false</code> | 

<a name="SocialHit"></a>

## SocialHit ⇐ [<code>Hit</code>](#Hit)
**Kind**: global class  
**Extends**: [<code>Hit</code>](#Hit)  
**Export**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | The social network |
| action | <code>string</code> | The social action. +1, like, etc |
| targetUrl | <code>string</code> | The target url. |


* [SocialHit](#SocialHit) ⇐ [<code>Hit</code>](#Hit)
    * [.SocialHit](#SocialHit.SocialHit)
        * [new SocialHit(network, action, targetUrl)](#new_SocialHit.SocialHit_new)

<a name="SocialHit.SocialHit"></a>

### SocialHit.SocialHit
**Kind**: static class of [<code>SocialHit</code>](#SocialHit)  
<a name="new_SocialHit.SocialHit_new"></a>

#### new SocialHit(network, action, targetUrl)
Creates an instance of SocialHit.


| Param | Type |
| --- | --- |
| network | <code>string</code> | 
| action | <code>string</code> | 
| targetUrl | <code>string</code> | 

<a name="NewGoogleAnalyticsTracker"></a>

## NewGoogleAnalyticsTracker
**Kind**: global class  

* [NewGoogleAnalyticsTracker](#NewGoogleAnalyticsTracker)
    * [new NewGoogleAnalyticsTracker(trackerId, customDimensionsFieldsIndexMap)](#new_NewGoogleAnalyticsTracker_new)
    * [.trackScreen(screenName)](#NewGoogleAnalyticsTracker+trackScreen)
    * [.trackScreenHit(hit)](#NewGoogleAnalyticsTracker+trackScreenHit)
    * [.trackEvent(category, action, [label], [value])](#NewGoogleAnalyticsTracker+trackEvent)
    * [.trackEvenHit(hit)](#NewGoogleAnalyticsTracker+trackEvenHit)
    * [.trackTiming(category, interval, name, [label])](#NewGoogleAnalyticsTracker+trackTiming)
    * [.trackTimingHit(hit)](#NewGoogleAnalyticsTracker+trackTimingHit)
    * [.trackException(error, [fatal])](#NewGoogleAnalyticsTracker+trackException)
    * [.trackExceptionHit(hit)](#NewGoogleAnalyticsTracker+trackExceptionHit)
    * [.trackSocial(network, action, targetUrl)](#NewGoogleAnalyticsTracker+trackSocial)
    * [.trackSocialHit(hit)](#NewGoogleAnalyticsTracker+trackSocialHit)
    * [.setUser(userId)](#NewGoogleAnalyticsTracker+setUser)
    * [.setClient(clientId)](#NewGoogleAnalyticsTracker+setClient)
    * [.allowIDFA(enabled)](#NewGoogleAnalyticsTracker+allowIDFA)
    * [.setAppName(appName)](#NewGoogleAnalyticsTracker+setAppName)
    * [.setAppVersion(appVersion)](#NewGoogleAnalyticsTracker+setAppVersion)
    * [.setAnonymizeIp(enabled)](#NewGoogleAnalyticsTracker+setAnonymizeIp)
    * [.setSamplingRate(sampleRatio)](#NewGoogleAnalyticsTracker+setSamplingRate)
    * [.setCurrency(currencyCode)](#NewGoogleAnalyticsTracker+setCurrency)
    * [.setTrackUncaughtExceptions(enabled)](#NewGoogleAnalyticsTracker+setTrackUncaughtExceptions)

<a name="new_NewGoogleAnalyticsTracker_new"></a>

### new NewGoogleAnalyticsTracker(trackerId, customDimensionsFieldsIndexMap)
Save all tracker related data that is needed to call native methods with proper data.


| Param | Type | Description |
| --- | --- | --- |
| trackerId | <code>string</code> | Your tracker id, something like: UA-12345-1 |
| customDimensionsFieldsIndexMap | <code>Object</code> | Custom dimensions field/index pairs |

**Example**  
```js
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-12345-1');
```
<a name="NewGoogleAnalyticsTracker+trackScreen"></a>

### tracker.trackScreen(screenName)
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| screenName | <code>string</code> | 

<a name="NewGoogleAnalyticsTracker+trackScreenHit"></a>

### tracker.trackScreenHit(hit)
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| hit | [<code>ScreenHit</code>](#ScreenHit) | 

<a name="NewGoogleAnalyticsTracker+trackEvent"></a>

### tracker.trackEvent(category, action, [label], [value])
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Default |
| --- | --- | --- |
| category | <code>string</code> |  | 
| action | <code>string</code> |  | 
| [label] | <code>string</code> | <code>null</code> | 
| [value] | <code>number</code> | <code></code> | 

<a name="NewGoogleAnalyticsTracker+trackEvenHit"></a>

### tracker.trackEvenHit(hit)
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| hit | [<code>EventHit</code>](#EventHit) | 

<a name="NewGoogleAnalyticsTracker+trackTiming"></a>

### tracker.trackTiming(category, interval, name, [label])
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Default |
| --- | --- | --- |
| category | <code>string</code> |  | 
| interval | <code>number</code> |  | 
| name | <code>string</code> |  | 
| [label] | <code>string</code> | <code>null</code> | 

<a name="NewGoogleAnalyticsTracker+trackTimingHit"></a>

### tracker.trackTimingHit(hit)
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| hit | [<code>TimingHit</code>](#TimingHit) | 

<a name="NewGoogleAnalyticsTracker+trackException"></a>

### tracker.trackException(error, [fatal])
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Default |
| --- | --- | --- |
| error | <code>string</code> |  | 
| [fatal] | <code>boolean</code> | <code>false</code> | 

<a name="NewGoogleAnalyticsTracker+trackExceptionHit"></a>

### tracker.trackExceptionHit(hit)
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| hit | [<code>ExceptionHit</code>](#ExceptionHit) | 

<a name="NewGoogleAnalyticsTracker+trackSocial"></a>

### tracker.trackSocial(network, action, targetUrl)
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| network | <code>string</code> | 
| action | <code>string</code> | 
| targetUrl | <code>string</code> | 

<a name="NewGoogleAnalyticsTracker+trackSocialHit"></a>

### tracker.trackSocialHit(hit)
**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type |
| --- | --- |
| hit | [<code>SocialHit</code>](#SocialHit) | 

<a name="NewGoogleAnalyticsTracker+setUser"></a>

### tracker.setUser(userId)
Sets the current userId for tracking.

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The current userId |

<a name="NewGoogleAnalyticsTracker+setClient"></a>

### tracker.setClient(clientId)
Sets the current clientId for tracking.

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| clientId | <code>string</code> | The current userId |

<a name="NewGoogleAnalyticsTracker+allowIDFA"></a>

### tracker.allowIDFA(enabled)
Sets if IDFA (identifier for advertisers) collection should be enabled

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>boolean</code> | <code>true</code> | (Optional) Defaults to true |

<a name="NewGoogleAnalyticsTracker+setAppName"></a>

### tracker.setAppName(appName)
Sets the trackers appName
The Bundle name is used by default

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| appName | <code>string</code> | (Required) The app name |

<a name="NewGoogleAnalyticsTracker+setAppVersion"></a>

### tracker.setAppVersion(appVersion)
Sets the trackers appVersion

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| appVersion | <code>string</code> | (Required) The app version |

<a name="NewGoogleAnalyticsTracker+setAnonymizeIp"></a>

### tracker.setAnonymizeIp(enabled)
Sets if AnonymizeIp is enabled
If enabled the last octet of the IP address will be removed

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | (Required) Enable anonymize IP |

<a name="NewGoogleAnalyticsTracker+setSamplingRate"></a>

### tracker.setSamplingRate(sampleRatio)
Sets tracker sampling rate.

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| sampleRatio | <code>number</code> | (Required) Percentage 0 - 100 |

<a name="NewGoogleAnalyticsTracker+setCurrency"></a>

### tracker.setCurrency(currencyCode)
Sets the currency for tracking.

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| currencyCode | <code>string</code> | (Required) The currency ISO 4217 code |

<a name="NewGoogleAnalyticsTracker+setTrackUncaughtExceptions"></a>

### tracker.setTrackUncaughtExceptions(enabled)
Sets if uncaught exceptions should be tracked
Important to note: On iOS this option is set on all trackers. On Android it is set per tracker.
If you are using multiple trackers on iOS, this will enable & disable on all trackers.

**Kind**: instance method of [<code>NewGoogleAnalyticsTracker</code>](#NewGoogleAnalyticsTracker)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | Should enable uncaught exception tracking |

