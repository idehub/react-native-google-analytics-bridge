import { GoogleTagManagerBridge } from './NativeBridges';

export class GoogleTagManager {
  /**
   * Call once to open the container for all subsequent static calls.
   * @param {String} containerId
   */
  static openContainerWithId(containerId){
    return GoogleTagManagerBridge.openContainerWithId(containerId);
  }

  /**
   * Retrieves a boolean value with the given key from the opened container.
   * @param {String} key
   */
  static boolForKey(key){
    return GoogleTagManagerBridge.booleanForKey(key);
  }

  /**
   * Retrieves a string with the given key from the opened container.
   * @param {String} key
   */
  static stringForKey(key){
    return GoogleTagManagerBridge.stringForKey(key);
  }

  /**
   * Retrieves a number with the given key from the opened container.
   * @param {String} key
   */
  static doubleForKey(key){
    return GoogleTagManagerBridge.doubleForKey(key);
  }

  /**
   * push a datalayer event for Google Analytics through Google Tag Manager.
   * @param {String} eventName
   * @param {Object} dictionary An Map<String, Object> containing key and value pairs.
   it must have at least one key "event" with event name
   *         example: {event: "eventName", pageId: "/home"}
   */
  static pushDataLayerEvent(dictionary = {}){
    return GoogleTagManagerBridge.pushDataLayerEvent(dictionary);
  }

  /**
   * Sets logger to verbose
   * @param {Boolean} enabled
   */
  static setVerboseLoggingEnabled(enabled){
    return GoogleTagManagerBridge.setVerboseLoggingEnabled(enabled);
  }
}
