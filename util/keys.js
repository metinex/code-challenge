/**
 * Module for polyfill of getting key from an object
 * @module util/keys
 */
define(['util/global', 'underscore'], function (global, _) {

  if (global.Object && global.Object.keys) {
    return Object.keys.bind(Object);
  }

  return _.keys.bind(_);
});
