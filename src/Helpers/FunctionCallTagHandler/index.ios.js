import { NativeEventEmitter } from 'react-native';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { GoogleTagManagerBridge } from '../../NativeBridges';

/*
 * FunctionTagHandler module for iOS lazily adds the global event listner the first time a function tag
 * needs to be registered. Due to some limitations in native enviroment all Function Call tag events
 * from native realm are sent over as GTM_FUNCTION_CALL_TAG event. The event objects
 * include  _fn (function name) and payload attributes which are passed down to registered
 * handlers respectively
 */

const GTM_FUNCTION_CALL_TAG_EVENT = 'GTM_FUNCTION_CALL_TAG';

// Downstream events from native realm
const functionCallTagEventEmitter = new NativeEventEmitter(GoogleTagManagerBridge);

// tagEventEmmiter is used to handle callbacks in JS
let jsEventEmitter;

export default (GoogleTagManagerBridge, functionName, handler) => {

  if (!jsEventEmitter) {
    // Initialize JS event emitter
    jsEventEmitter = new EventEmitter();

    // Register a global listener for Function Tag events
    functionCallTagEventEmitter.addListener(GTM_FUNCTION_CALL_TAG_EVENT, ({_fn, payload}) => {
      // Pass on the event JS emitter
      // _fn is basically the same as functionName
      jsEventEmitter.emit(_fn, payload);
    });
  }
  
  return GoogleTagManagerBridge.registerFunctionCallTagHandler(functionName)
    .then(() => {
      jsEventEmitter.addListener(functionName, (payload) => {
        handler(functionName, payload)
      });
      return true;
    });
}
