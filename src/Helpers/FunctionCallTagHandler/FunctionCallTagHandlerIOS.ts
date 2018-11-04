import { NativeEventEmitter } from "react-native";
import { TagManagerBridge } from "../../NativeBridges";
import { Handler } from "./models";

/*
 * FunctionTagHandler module for iOS lazily adds the global event listner the first time a function tag
 * needs to be registered. Due to some limitations in native enviroment all Function Call tag events
 * from native realm are sent over as GTM_FUNCTION_CALL_TAG event. The event objects
 * include  _fn (function name) and payload attributes which are passed down to registered
 * handlers respectively
 */

const GTM_FUNCTION_CALL_TAG_EVENT = "GTM_FUNCTION_CALL_TAG";

interface Listener {
  functionName: string;
  handler: Handler;
}

// Downstream events from native realm
const functionCallTagEventEmitter = new NativeEventEmitter(TagManagerBridge);
const listeners: Array<Listener> = [];
let listenerRegistered = false;

// tagEventEmmiter is used to handle callbacks in JS
let jsEventEmitter;

export default (functionName: string, handler: Handler): Promise<boolean> => {
  if (!listenerRegistered) {
    // Register a global listener for Function Tag events
    functionCallTagEventEmitter.addListener(
      GTM_FUNCTION_CALL_TAG_EVENT,
      ({ _fn, payload }) => {
        // Pass on the event to listeners
        // _fn is basically the same as functionName
        jsEventEmitter.emit(_fn, payload);
        listeners.forEach(listener => {
          if (listener.functionName === _fn) {
            handler(_fn, payload);
          }
        });
      }
    );

    listenerRegistered = true;
  }

  return TagManagerBridge.registerFunctionCallTagHandler(functionName).then(
    () => {
      listeners.push({
        functionName,
        handler
      });

      return true;
    }
  );
};
