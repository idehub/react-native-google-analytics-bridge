import { DeviceEventEmitter } from 'react-native';

/*
 * FunctionTagHandler module for Android adds an event listener per each Function Call registration.
 * To prevent possible messaging collision between native and JS realms, events are prefixed in
 * both environments before being registered.
 * 
 * For example, if a handler is being registered to handle tags with function name of "do_stuff", the corresponding
 * messaging event would be GTM_FUNCTION_TAG_do_stuff. This is an implementation detail and does not affect high-level
 * APIs of the module.
 */

export default (GoogleTagManagerBridge, functionName, handler) => {

  const eventName = GoogleTagManagerBridge.TAG_EVENT_PREFIX + functionName;
    
  return GoogleTagManagerBridge.registerFunctionCallTagHandler(functionName)
    .then(() => {
      DeviceEventEmitter.addListener(eventName, function (event) {
        handler(this._fn, event);
      }.bind({_fn: functionName}));
      return true;
    });
}