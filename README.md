GoogleAnalyticsBridge ![npm version](https://img.shields.io/npm/v/react-native-google-analytics-bridge.svg)
=============
**Google Analytics Bridge** is built to provide an easy interface to the native Google Analytics libraries on both **iOS** and **Android**.

## Why a native bridge? Why not use just JavaScript?
The key difference with the native bridge is that you get a lot of the metadata handled automatically by the Google Analytics native library. This will include the device UUID, device model, viewport size, OS version etc.

You will only have to send in a few parameteres when tracking, e.g:
```javascript
const GoogleAnalytics = require('react-native-google-analytics-bridge');

GoogleAnalytics.trackScreenView('Home');
GoogleAnalytics.trackEvent('testcategory', 'testaction');
```

## Installation with rnpm
1. `npm install --save react-native-google-analytics-bridge`
2. `rnpm link react-native-google-analytics-bridge`

With this, [rnpm](https://github.com/rnpm/rnpm) will do most of the heavy lifting for linking, **but** you will still need to do some of the manual steps below.

These are step 5 and 6 from the iOS installation, and step 4 from the Android installation. Specifically for Android step 4, you'll have to add the tracking id.

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
6. Under your project properties ➜ "Info", add a new line with the following:
  1. Key: GAITrackingId
  2. Type: String
  3. Value: UA-12345-1 (in other words, your own tracking id).
7. **Optional step**: If you plan on using the advertising identifier (IDFA), then you need to do two things:
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
  include ':GoogleAnalyticsBridge', ':app'
  project(':GoogleAnalyticsBridge').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-google-analytics-bridge/android')
  ```

3. And the following in `android/app/build.gradle`

  ```gradle
  ...
  dependencies {
      ...
      compile project(':GoogleAnalyticsBridge')
  }
  ```

4. Register package in `MainActivity.java`

  ```java
  // Step 1; import package:
  import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;

  public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
      ...

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          ...

          mReactInstanceManager = ReactInstanceManager.builder()
                  .setApplication(getApplication())
                  .setBundleAssetName("index.android.bundle")
                  .setJSMainModuleName("index.android")
                  .addPackage(new MainReactPackage())
                  // Step 2; register package, with your GA tracking id:
                  .addPackage(new GoogleAnalyticsBridgePackage("UA-12345-1"))
                  .setUseDeveloperSupport(BuildConfig.DEBUG)
                  .setInitialLifecycleState(LifecycleState.RESUMED)
                  .build();

          ...
      }
      ...
  ```

## Javascript API

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

**Important**: For iOS you can only use this method if you have done the optional step 7 from the installation guide.

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

Events, screen views, etc, are sent in batches to your tracker. This function allows you to configure how often (in seconds) the batches are sent to your tracker. Recommended to keep this around 30-120 seconds to preserve battery and network traffic.

```javascript
GoogleAnalytics.setDispatchInterval(30);
```

## Roadmap

- [x] dryRun flag
- [x] Simple Ecommerce
- [ ] Make the library more configureable

## peerDependencies
This library should work with at least React Native 0.11 and up, but has been tested mostly with 0.17.

I've decided to remove the React Native peerDependency since some users have had issues with how npm handles peerDependencies, especially with -rc versions.
