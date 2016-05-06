GoogleAnalyticsBridge [![npm version](https://img.shields.io/npm/v/react-native-google-analytics-bridge.svg)](https://www.npmjs.com/package/react-native-google-analytics-bridge)
=============
**Google Analytics Bridge** is built to provide an easy interface to the native Google Analytics libraries on both **iOS** and **Android**.

**Important**: This library requires React Native v0.19+.

## Why a native bridge? Why not use just JavaScript?
The key difference with the native bridge is that you get a lot of the metadata handled automatically by the Google Analytics native library. This will include the device UUID, device model, viewport size, OS version etc.

You will only have to send in a few parameteres when tracking, e.g:
```javascript
import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId('UA-12345-1');

GoogleAnalytics.trackScreenView('Home');
GoogleAnalytics.trackEvent('testcategory', 'testaction');
```

## Installation with rnpm
1. `npm install --save react-native-google-analytics-bridge`
2. `rnpm link react-native-google-analytics-bridge`

With this, [rnpm](https://github.com/rnpm/rnpm) will do most of the heavy lifting for linking, **but** for iOS you will still need to do step 5 from the manual installation guide below.

## Manual installation iOS

1. `npm install --save react-native-google-analytics-bridge`
2. In XCode, right-click the Libraries folder under your project ➜ `Add Files to <your project>`.
3. Go to `node_modules` ➜ `react-native-google-analytics-bridge` ➜ `ios` ➜ `RCTGoogleAnalyticsBridge` and add the `RCTGoogleAnalyticsBridge.xcodeproj` file.
4. Add libRCTGoogleAnalyticsBridge.a from the linked project to your project properties ➜ "Build Phases" ➜ "Link Binary With Libraries"
5. Next you will have to link a few more SDK framework/libraries which are required by GA (if you do not already have them linked.) Under the same "Link Binary With Libraries", click the + and add the following:
  1. CoreData.framework
  2. SystemConfiguration.framework
  3. libz.tbd
  4. libsqlite3.0.tbd
6. **Optional step**: If you plan on using the advertising identifier (IDFA), then you need to do two things:
  1. Add AdSupport.framework under "Link Binary With Libraries". (As with the other frameworks in step 5).
  2. Go to Xcode ➜ `Libraries` ➜ `RCTGoogleAnalyticsBridge.xcodeproj` ➜ right-click `google-analytics-lib`. Here you need to `Add files to ..`, and add `libAdIdAccess.a` from the `google-analytics-lib` directory. This directory is located in the same `node_modules` path as in step 3.

## Prerequisites for Android
Make sure you have the following SDK packages installed in the Android SDK Manager:
  * Google Repository
  * Google Play services
  * Google APIs (Atom) system image

Consult [this guide](https://developer.android.com/sdk/installing/adding-packages.html) if you are unsure how to do this. Specifically step 3 for the mentioned packages.

## Manual installation Android

1. `npm install --save react-native-google-analytics-bridge`
2. Add the following in `android/setting.gradle`

  ```gradle
  ...
  include ':react-native-google-analytics-bridge', ':app'
  project(':react-native-google-analytics-bridge').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-google-analytics-bridge/android')
  ```

3. And the following in `android/app/build.gradle`

  ```gradle
  ...
  dependencies {
      ...
      compile project(':react-native-google-analytics-bridge')
  }
  ```

4. Register package in `MainActivity.java`

  ```java
  // Step 1; import package:
  import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;

  public class MainActivity extends ReactActivity {
    ...
    
      @Override
      protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              // Step 2; register package:
              new GoogleAnalyticsBridgePackage()
          );
      }
  }
  ```

## Google Analytics Javascript API

### setTrackerId(trackerId)
* **trackerId (required):** String, your tracker id, something like: UA-12345-1

**Important**: Call **once** on app startup to set the tracker id for all subsequent static calls.

```javascript
import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId('UA-12345-1')
```
    
### trackScreenView(screenName)

* **screenName (required):** String, name of current screen

**Important**: Calling this will also set the "current view" for other calls. So events tracked will be tagged as having occured on the current view, `Home` in this example. This means it is important to track navigation, especially if events can fire on different views.

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/screens) for more info

```javascript
GoogleAnalytics.trackScreenView('Home')
```

### trackEvent(category, action, optionalValues)

* **category (required):** String, category of event
* **action (required):** String, name of action
* **optionalValues:** Object
  * **label:** String
  * **value:** Number

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/events) for more info.

```javascript
GoogleAnalytics.trackEvent('testcategory', 'testaction');
// or
GoogleAnalytics.trackEvent('testcategory', 'testaction', {label: 'v1.0.3', value: 22});
```

### trackTiming(category, value, optionalValues)

* **category (required):** String, category of the timed event
* **value (required):** Number, the timing measurement in milliseconds
* **optionalValues:** Object
  * **name:** String, the name of the timed event
  * **label:** String, the label of the timed event

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/usertimings) for more info.

```javascript
GoogleAnalytics.trackTiming('testcategory', 13000);
// or
GoogleAnalytics.trackTiming('testcategory', 13000, {name: 'loadList', label: 'v1.0.3'});
```

### trackPurchaseEvent(product, transaction, eventCategory, eventAction)

* **product (required):** Object
  * **id:** String
  * **name:** String
  * **category:** String
  * **brand:** String
  * **variant:** String
  * **price:** Number
  * **quantity:** Number
  * **couponCode:** String
* **transaction (required):** Object
  * **id:** String
  * **affiliation:** String, an entity with which the transaction should be affiliated (e.g. a particular store)
  * **revenue:** Number
  * **tax:** Number
  * **shipping:** Number
  * **couponCode:** String
* **eventCategory (required):** String, defaults to "Ecommerce"
* **eventAction (required):** String, defaults to "Purchase"

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/enhanced-ecommerce#measuring-transactions) for more info.

```javascript
GoogleAnalytics.trackPurchaseEvent({
  id: 'P12345',
  name: 'Android Warhol T-Shirt',
  category: 'Apparel/T-Shirts',
  brand: 'Google',
  variant: 'Black',
  price: 29.20,
  quantity: 1,
  couponCode: 'APPARELSALE'
}, {
  id: 'T12345',
  affiliation: 'Google Store - Online',
  revenue: 37.39,
  tax: 2.85,
  shipping: 5.34,
  couponCode: 'SUMMER2013'
}, 'Ecommerce', 'Purchase');
```

### trackException(error, fatal)

* **error:** String, a description of the exception (up to 100 characters), accepts nil
* **fatal (required):** Boolean, indicates whether the exception was fatal, defaults to false

See the [Google Analytics docs](https://developers.google.com/analytics/devguides/collection/ios/v3/exceptions) for more info.

```javascript
try {
  ...
} catch(error) {
  GoogleAnalytics.trackException(error.message, false);
}
```

### trackSocialInteraction(network, action, targetUrl)

* **network (required):** String, name of social network (e.g. 'Facebook', 'Twitter', 'Google+')
* **action (required):** String, social action (e.g. 'Like', 'Share', '+1')
* **targetUrl:** String, url of content being shared

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/social) docs for more info.

```javascript
GoogleAnalytics.trackSocialInteraction('Twitter', 'Post');
```

### setUser(userId)

* **userId (required):** String, an **anonymous** identifier that complies with Google Analytic's user ID policy

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/user-id) for more info.

```javascript
GoogleAnalytics.setUser('12345678');
```

### allowIDFA(enabled)

* **enabled (required):** Boolean, true to allow IDFA collection, defaults to `true`.

Also called advertising identifier collection, and is used for advertising features.

**Important**: For iOS you can only use this method if you have done the optional step 6 from the installation guide. Only enable this (and link the appropriate libraries) if you plan to use advertising features in your app, or else your app may get rejected from the AppStore.

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/campaigns#ios-install) for more info.

```javascript
GoogleAnalytics.allowIDFA(true);
```

### setDryRun(enabled)

* **enabled (required):** Boolean, indicating if the `dryRun` flag should be enabled or not.

When enabled the native library prevents any data from being sent to Google Analytics. This allows you to test or debug the implementation, without your test data appearing in your Google Analytics reports.

```javascript
GoogleAnalytics.setDryRun(true);
```

### setDispatchInterval(intervalInSeconds)

* **intervalInSeconds (required):** Number, indicating how often dispatches should be sent

Events, screen views, etc, are sent in batches to your tracker. This function allows you to configure how often (in seconds) the batches are sent to your tracker. Recommended to keep this around 20-120 seconds to preserve battery and network traffic.
This is set to 20 seconds by default.

```javascript
GoogleAnalytics.setDispatchInterval(30);
```

### setTrackUncaughtExceptions(enabled)

* **enabled (required):** Boolean

Sets if uncaught exceptions should be tracked. This is enabled by default.

```javascript
GoogleAnalytics.setTrackUncaughtExceptions(true);
```

### setAnonymizeIp(enabled)

* **enabled (required):** Boolean

Sets if AnonymizeIp is enabled. This is disabled by default.
If enabled the last octet of the IP address will be removed.

```javascript
GoogleAnalytics.setAnonymizeIp(true);
```

### setOptOut(enabled)

* **enabled (required):** Boolean

Sets if OptOut is active and disables Google Analytics. This is disabled by default.
Note: This has to be set each time the App starts.

```javascript
GoogleAnalytics.setOptOut(true);
```

## Google Tag Manager Javascript API

The `GoogleTagManager` type is available at `GoogleAnalytics.GoogleTagManager`. If you want to use it alongside `GoogleAnalytics`:
```javascript
import GoogleAnalytics, { GoogleTagManager } from 'react-native-google-analytics-bridge';
GoogleTagManager.openContainerWithId('GT-NZT48')
.then(() => GoogleTagManager.stringForKey('pack'))
.then((str) => console.log('Pack: ', str));
```

All methods returns a `Promise`.

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
GoogleTagManager.stringForKey('key').then((val) => console.log(val));
```

### boolForKey(key)
##### Parameter(s)
* **key (required):** String

##### Returns:
* **value:** Boolean 

Retrieves a boolean value with the given key from the opened container.

```javascript
GoogleTagManager.boolForKey('key').then((val) => console.log(val));
```

### doubleForKey(key)
##### Parameter(s)
* **key (required):** String

##### Returns:
* **value:** Number 

Retrieves a number with the given key from the opened container.

```javascript
GoogleTagManager.doubleForKey('key').then((val) => console.log(val));
```

## Simple A/B-testing
Setting up A/B-testing requires setup of containers in Google Tag Manager, and connecting this with Goals/Experiments in Google Analytics.

This [blog post](http://www.cbrevik.com/google-tag-manager-and-ab-testing-with-react-native/) details how to do this. [This guide from Google](https://support.google.com/tagmanager/answer/6003007?hl=en) will also prove helpful (and is referenced in the aforementioned blog post).

Then you can use our Google Tag Manager implementation to pull values out of the container, and track events in Google Analytics in order to complete "goals".

In this way, the different containers (A/B) the user is given, will be linked to whether or not they accomplish the given goal.

## Google Analytics Logging
There is a divergence in how the iOS and Android versions of the native library handles logging. 

[For Android](https://developers.google.com/analytics/devguides/collection/android/v4/advanced#logger) you can check the GA logs with your favorite terminal by using `adb logcat`.

For iOS there is a logger in the [internal library](https://developers.google.com/analytics/devguides/collection/ios/v3/advanced#logger) that writes events to the XCode output window. 
In order to control the `logLevel` you can add an item in your `Info.plist` with the key `GAILogLevel`. The value you use is a number which corresponds to your desired log-level:

* 0: None
* 1: Errors
* 2: Warnings
* 3: Info
* 4: Verbose

## Roadmap

- [ ] Ecommerce: checkout process
- [ ] Ecommerce: impressions
- [ ] Campaigns
- [x] Support for A/B testing
- [x] dryRun flag
- [x] Simple ecommerce
- [x] Make the library more configureable
