/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import GoogleAnalytics, { GoogleTagManager } from 'react-native-google-analytics-bridge';

class example extends Component {
  render() {
    GoogleAnalytics.setTrackerId('UA-12345-2');
      
    // Recommend you set this much higher in real app! 30 seconds+
    GoogleAnalytics.setDispatchInterval(2);
    
    GoogleTagManager.openContainerWithId("GT-NZT48")
    .then(() => {
      return GoogleTagManager.stringForKey("pack");
    })
    .then((str) => {
      console.log("Str: ", str);
      return GoogleTagManager.boolForKey("wat");
    })
    .then((wat) => {
      console.log("Wat: ", wat);
      return GoogleTagManager.doubleForKey("orly");
    })
    .then((orly) => {
      console.log("Orly: ", orly);
    })
    .catch((err) => {
      console.log(err);
    });
    
    //GoogleAnalytics.setDryRun(true);
    GoogleAnalytics.trackEvent('testcategory', 'Hello iOS');
    GoogleAnalytics.trackScreenView('Home');

    GoogleAnalytics.trackEvent('testcategory', 'Hello iOS', { label: "notdry", value: 1 });

    GoogleAnalytics.trackTiming('testcategory', 13000, {label: 'notdry', name: 'testduration'});

    GoogleAnalytics.trackPurchaseEvent(
      {
        id: 'P12345',
        name: 'Android Warhol T-Shirt',
        category: 'Apparel/T-Shirts',
        brand: 'Apple',
        variant: 'Black',
        price: 29.20,
        quantity: 1,
        couponCode: 'APPARELSALE'
      }, {
        id: 'T12345',
        affiliation: 'Apple Store - Online',
        revenue: 37.39,
        tax: 2.85,
        shipping: 5.34,
        couponCode: 'SUMMER2013'
      }
    );

    GoogleAnalytics.trackMultiProductsPurchaseEvent(
    [
      {
        id: '2224711',
        name: 'Top Ilem',
        category: 'Women/Kleidung/Tops/Spitzentops',
        brand: 'THE label',
        variant: 'rot',
        price: 39.90,
        quantity: 1
      },
      {
        id: '2224706',
        name: 'Shorts Isto',
        category: 'Women/Kleidung/Hosen/Shirts',
        brand: 'THE label',
        variant: 'grau',
        price: 59.90,
        quantity: 1
      }
    ], {
      id: 'T12345',
      affiliation: 'THE label Shop',
      revenue: 83.87,
      tax: 15.93,
      shipping: 0.00,
      couponCode: 'SUMMER2016'
    });

    GoogleAnalytics.trackException("This is an error message", false);

    GoogleAnalytics.trackSocialInteraction('Twitter', 'Post');

    GoogleAnalytics.setUser('12345678');

    GoogleAnalytics.allowIDFA(true);
    
    //GoogleAnalytics.setOptOut(true);
    
    GoogleAnalytics.setAnonymizeIp(true);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => example);
