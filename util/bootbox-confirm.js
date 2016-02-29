/**
 * Promisify callbacks of Bootstrap Bootbox ("Bootstrap modals made easy")
 * @see http://bootboxjs.com/
 * @module util/bootbox-confirm
 */
define([
  'util/global',
  'bootstrap-bootbox',
  'es6-promise',
  'bootstrap'
], function (global, bootbox) {

  return function (question) {

    question = question || 'Are you sure?';

    return new global.Promise(function(resolve, reject) {
      try {
        bootbox.confirm(question, function (result) {
          resolve(result)
        });
      } catch (error) {
        reject(error);
      }
    });

  };
});
