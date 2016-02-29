/**
 * Module for polyfill of getting key from an object
 * @OOP Implementing Module Pattern along with RequireJS' define statement
 * @module util/keys
 */
define(['util/global', 'underscore'], function (global, _) {

  if (global.Object && global.Object.keys) {
    return Object.keys.bind(Object);
  }

  return _.keys.bind(_);
});
