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
## Classes

<dl>
<dt><a href="#GoogleAnalyticsSettings">GoogleAnalyticsSettings</a></dt>
<dd></dd>
<dt><a href="#GoogleAnalyticsTracker">GoogleAnalyticsTracker</a></dt>
<dd></dd>
<dt><a href="#GoogleTagManager">GoogleTagManager</a></dt>
<dd></dd>
</dl>

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

