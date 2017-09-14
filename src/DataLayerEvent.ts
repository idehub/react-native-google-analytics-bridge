export default interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

/**
 * The Google Tag Manager DataLayerEvent dictionary.
 *
 * The only required property is event.
 *
 * @interface DataLayerEvent
 * @param {string} event
 */
