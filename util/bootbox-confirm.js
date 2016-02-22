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
