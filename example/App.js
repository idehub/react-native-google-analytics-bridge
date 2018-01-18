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
    tracker.trackPurchaseEvent(
      {
        id: "P12345",
        name: "Android Warhol T-Shirt",
        category: "Apparel/T-Shirts",
        brand: "Apple",
        variant: "Black",
        price: 29.2,
        quantity: 1,
        couponCode: "APPARELSALE"
      },
      {
        id: "T12345",
        affiliation: "Apple Store - Online",
        revenue: 37.39,
        tax: 2.85,
        shipping: 5.34,
        couponCode: "SUMMER2013"
      }
    );

    tracker.trackMultiProductsPurchaseEvent(
      [
        {
          id: "2224711",
          name: "Top Ilem",
          category: "Women/Kleidung/Tops/Spitzentops",
          brand: "THE label",
          variant: "rot",
          price: 39.9,
          quantity: 1
        },
        {
          id: "2224706",
          name: "Shorts Isto",
          category: "Women/Kleidung/Hosen/Shirts",
          brand: "THE label",
          variant: "grau",
          price: 59.9,
          quantity: 1
        }
      ],
      {
        id: "T12345",
        affiliation: "THE label Shop",
        revenue: 83.87,
        tax: 15.93,
        shipping: 0.0,
        couponCode: "SUMMER2016"
      }
    );

    tracker.trackException("This is an error message", false);

    tracker.trackSocialInteraction("Twitter", "Post");

    tracker.setUser("12345678");

    tracker.allowIDFA(true);

    tracker.setAnonymizeIp(true);

    tracker.trackScreenView("Hello");

    /*GoogleTagManager.openContainerWithId("GT-NZT48")
      .then(() => {
        return GoogleTagManager.stringForKey("pack");
      })
      .then(str => {
        console.log("Str: ", str);
        return GoogleTagManager.boolForKey("wat");
      })
      .then(wat => {
        console.log("Wat: ", wat);
        return GoogleTagManager.doubleForKey("orly");
      })
      .then(orly => {
        console.log("Orly: ", orly);
      })
      .catch(err => {
        console.log(err);
      });*/

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
