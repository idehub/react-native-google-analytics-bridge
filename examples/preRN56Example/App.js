import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
  GoogleTagManager
} from "react-native-google-analytics-bridge";
export default class App extends Component {
  render() {
    // Recommend you set this much higher in real app! 30 seconds+
    // GoogleAnalyticsSettings has static methods and is applied
    // for all trackers
    GoogleAnalyticsSettings.setDispatchInterval(2);
    //GoogleAnalyticsSettings.setDryRun(true);
    //GoogleAnalyticsSettings.setOptOut(true);

    // The tracker is constructed
    let tracker = new GoogleAnalyticsTracker("UA-12345-3");
    // You can have multiple trackers
    //let tracker2 = new GoogleAnalyticsTracker("UA-12345-3", { demo: 1 });

    //tracker2.trackScreenViewWithCustomDimensionValues("Home", { demo: "Yes" });

    tracker.trackEvent("testcategory", "Hello iOS");

    tracker.trackScreenView("Home");

    tracker.trackEvent("testcategory", "Hello iOS", {
      label: "notdry",
      value: 1
    });

    tracker.trackTiming("testcategory", 13000, {
      label: "notdry",
      name: "testduration"
    });

    tracker.setTrackUncaughtExceptions(true);

    tracker.setUser("12345678");

    tracker.allowIDFA(true);

    tracker.setAnonymizeIp(true);

    tracker.trackScreenView("Hello");

    GoogleTagManager.openContainerWithId("GTM-NZT48")
      .then(() => {
        return GoogleTagManager.registerFunctionCallTagHandler(
          "awzm_tag",
          (fn, payload) => {
            console.log("test", fn, payload);
          }
        );
      })
      .then(() => {
        return GoogleTagManager.registerFunctionCallTagHandler(
          "some_other_tag",
          (fn, payload) => {
            console.log("test2", fn, payload);
          }
        );
      })
      .then(reg => {
        console.log("Push?: ", reg);
        return GoogleTagManager.pushDataLayerEvent({
          event: "some_event",
          id: 1
        });
      })
      .then(db => {
        console.log("db: ", db);
        return GoogleTagManager.doubleForKey("db");
      })
      .catch(err => {
        console.log(err);
      });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Google Analytics Bridge!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
