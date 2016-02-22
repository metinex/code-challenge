/**
 * Module for handling global window object in accordance with popup windows or Nodejs environment
 * @module util/global
 */
define([], function () {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return {};
});
