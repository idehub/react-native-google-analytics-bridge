import { NativeEventEmitter } from 'react-native';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

/*
 * RNTagEmitterSingleton module is iOS only and does not have an Android counterpart.
 * That's why it's being imported directly NativeModules instead of NativeBridges.
 */

import { NativeModules } from 'react-native';
const { RNTagEmitterSingleton } = NativeModules;


/*
 * FunctionTagHandler module for iOS lazily adds the global event listner the first time a function tag
 * needs to be registered. Due to some limitations in native enviroment all function tag
 * events from native realm are sent over as GTM_FUNCTION_TAG event. The event objects
 * includes payload and _fn (function name) attributes which are passed down to registered
 * handlers respectively
 */

// Downstream events from native realm
const functionCallTagEventEmmiter = new NativeEventEmitter(RNTagEmitterSingleton);

// tagEventEmmiter is used to handle callbacks in JS
let jsEventEmitter;

export default (GoogleTagManagerBridge, functionName, handler) => {

  if (!jsEventEmitter) {
    // Initialize JS event emitter
    jsEventEmitter = new EventEmitter();

    // Register a global listener for Function Tag events
    functionCallTagEventEmmiter.addListener(RNTagEmitterSingleton.TAG_EVENT, ({_fn, payload}) => {
      // Emit events on JS emitter
      // _fn is basically the same as functionName
      jsEventEmitter.emit(_fn, payload);
    });
  }
  
  return GoogleTagManagerBridge.registerFunctionCallTagHandler(functionName)
    .then(() => {
      jsEventEmitter.addListener(functionName, ({_fn, payload}) => {
        handler(_fn, payload)
      });
      return true;
    });
}