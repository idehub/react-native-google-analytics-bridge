export default interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

/**
 * The Google Tag Manager DataLayerEvent dictionary.
 *
 * Populate this event-object with values to push to the DataLayer. The only required property is `event`.
 * @example
 * const dataLayerEvent = {
 *   event: "eventName",
 *   pageId: "/home"
 * };
 * GoogleTagManager.pushDataLayerEvent(dataLayerEvent);
 *
 * @interface DataLayerEvent
 * @param {string} event
 */
