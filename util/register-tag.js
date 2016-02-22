/**
 * Module to polyfill Web Component's custom tags
 * @module util/register-tag
 */
define(['util/global', 'webcomponents'], function (global) {

  /**
   * Registers new custom tag
   * @param {String} tag name to register
   **/
  return function (tag) {
    /**
     * Checks if tag is already registered
     * @param {String} tag name to register
     **/
    var checkIfRegistered = function (tag) {
      switch (document.createElement(tag).constructor) {
        case HTMLElement:
          return false;
        case HTMLUnknownElement:
          return undefined;
      }
      return true;
    };
    return checkIfRegistered(tag) === true ?
      false : global.document.registerElement(tag);
  }
});
