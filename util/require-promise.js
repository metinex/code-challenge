/**
 * Module for handling ES6 style promises
 * @OOP Wrapping ES6 promosise object using Proxy Pattern
 * @module util/require-promise
 */
define([
  'util/global',
  'util/promise'
], function (global) {
  return function (modulesToLoad) {
    return new global.Promise(function (resolve, reject) {
      require(modulesToLoad, function () {
        try {
          resolve.apply(this, arguments);
        } catch (error) {
          reject(error);
        }
      }, function (error) {
        reject(error);
      });
    });
  }
});
