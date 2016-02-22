/**
 * Module returning ES6 promise
 * @module util/promise
 */
define(['util/global', 'es6-promise'], function (global, promise) {
  if (global.Promise) {
    return global.Promise;
  }
  return global.Promise = promise.Promise;
});
