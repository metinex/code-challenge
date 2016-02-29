define([
  'buddy/model/buddy',
  'base/validator',
  'moment',
  'util/assign'
], function (BuddyModel, BaseValidator, moment, assign) {

  return BuddyModel.extend({

    validation : BaseValidator

  })

});
