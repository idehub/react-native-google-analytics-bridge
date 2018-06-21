import { DeviceEventEmitter } from 'react-native';

/*
 * FunctionTagHandler module for Android adds an event listener per each Function Call registration.
 * To prevent possible messaging collision between native and JS realms, events are prefixed in
 * both environments before being registered.
 * For example, if a handler is being registered to handle tags with function name of "some_func", the corresponding
 * event would be GTM_FUNCTION_CALL_TAG_some_func. This is an implementation detail and does not affect high-level
 * APIs of the module.
 */

const TAG_EVENT_PREFIX = 'GTM_FUNCTION_CALL_TAG_';

export default (GoogleTagManagerBridge, functionName, handler) => {

  const event = TAG_EVENT_PREFIX + functionName;
    
  return GoogleTagManagerBridge.registerFunctionCallTagHandler(functionName)
    .then(() => {
      DeviceEventEmitter.addListener(event, (payload) => {
        handler(functionName, payload);
      });
      return true;
    });
}
