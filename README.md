GoogleAnalyticsBridge ![npm version](https://img.shields.io/npm/v/react-native-google-analytics-bridge.svg)
=============
**Google Analytics Bridge** is built to provide an easy interface to the native Google Analytics libraries on both **iOS** and **Android**.

## Why a native bridge?
There already exists an excellent library for [Google Analytics tracking by lwansbrough](https://github.com/lwansbrough/react-native-google-analytics) which uses just JavaScript, why do we need a native bridge?

The key difference is that with this native bridge you get a lot of the metadata handled automatically by the Google Analytics library. This will include the device UUID, device model, viewport size, OS version etc.
With the pure javascript variant you will have to pull this information out via a native bridge (e.g. with [rebeccahughes' DeviceInfo](https://github.com/rebeccahughes/react-native-device-info)) in order to track it.

With the native library you will only have to send in a few parameteres when tracking, e.g:
```javascript
const GoogleAnalytics = require('react-native-google-analytics-bridge');

GoogleAnalytics.trackScreenView('Home');
GoogleAnalytics.trackEvent('testcategory', 'testaction');
```

## Installation with rnpm
1. `npm install --save react-native-google-analytics-bridge`
2. `rnpm link react-native-google-analytics-bridge`

With this, [rnpm](https://github.com/rnpm/rnpm) will do most of the heavy lifting for linking, **but** you will still need to do some of the manual steps below.

These are step 5 and 6 from the iOS installation, and 4 and 5 from the Android installation. Specifically for Android step 4, you'll have to add the tracking id.

## Manual installation iOS

1. `npm install --save react-native-google-analytics-bridge`
2. In XCode, right click the Libraries folder under your project ➜ `Add Files to <your project>`.
3. Go to `node_modules` ➜ `react-native-google-analytics-bridge` ➜ `ios` ➜ `RCTGoogleAnalyticsBridge` and add the `RCTGoogleAnalyticsBridge.xcodeproj` file.
4. Add libRCTGoogleAnalyticsBridge.a from the linked project to your project properties ➜ "Build Phases" ➜ "Link Binary With Libraries"
5. Next you will have to link a few more SDK framework/libraries which are required by GA (if you do not already have them linked.) Under the same "Link Binary With Libraries", click the + and add the following:
  1. AdSupport.framework
  2. CoreData.framework
  3. SystemConfiguration.framework
  4. libz.tbd
  5. libsqlite3.0.tbd
6. Under your project properties ➜ "Info", add a new line with the following:
  1. Key: GAITrackingId
  2. Type: String
  3. Value: UA-12345-1 (in other words, your own tracking id).
7. See own guide for tracking from Javascript.

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
5. Make sure your `AndroidManifest.xml` has `INTERNET` and `ACCESS_NETWORK_STATE` permissions
  ```xml
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.example">

      <uses-permission android:name="android.permission.INTERNET" />
      <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
      ...
  ```

## Javascript API
At the moment the implementation only exposes two methods:
### trackScreenView(screenName)
This method only takes one parameter, the name of the current screen view. E. g. `GoogleAnalytics.trackScreenView('Home')`.

**Important**: Calling this will also set the "current view" for other calls. So events tracked will be tagged as having occured on the current view, `Home` in this example. This means it is important to track navigation, especially if events can fire on different views.
### trackEvent(category, action, optionalValues = {})
This method takes takes two required parameters, the event `category` and `action`. The `optionalValues` has two possible properties, `label` and `value`.

As the name implies, `optionalValues` can be left out, or can contain one or both properties. Whatever floats your boat.

E. g. `GoogleAnalytics.trackEvent('testcategory', 'testaction');` or `GoogleAnalytics.trackEvent('testcategory', 'testaction', { label: "v1.0.3", value: 22 });`

**Note**: Label is a string, while value must be a number.
