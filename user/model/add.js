define([
  'user/model/base',
  'base/user-validator',
  'moment',
  'util/assign'
], function (UserModel, UserValidator, moment, assign) {
  return UserModel.extend({

    defaults : assign(UserModel.prototype.defaults, {
      repeatPassword: ''
    }),

    validation : UserValidator

  });
});
