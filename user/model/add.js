define([
  'user/model',
  'moment',
  'util/assign'
], function (UserModel, moment, assign) {
  return UserModel.extend({

    initialize : function () {
      this.currentMoment = moment();
      this.minBirthdayMoment = moment(this.currentMoment)
        .subtract(150, 'years');
      this.maxBirthdayMoment = moment(this.currentMoment)
        .subtract(14, 'years');

      return UserModel.prototype.initialize.apply(this, arguments);
    },

    defaults : assign(UserModel.prototype.defaults, {
      repeatPassword: ''
    }),

    validation : {

      username : {
        required: true
      },

      fullName : {
        required: true,
        minLength: 3,
        maxLength: 50,
        pattern: /^[A-Za-z\s]+$/
      },

      password : {
        required: true,
        minLength: 6
      },

      repeatPassword : {
        equalTo: 'password',
        msg: 'The passwords does not match'
      },

      birthdayScreen : function () {
        value = moment(this.get('birthday'), moment.ISO_8601);
        if (value.isValid() === false) {
          return 'Birthday is required';
        }
        if (value.isBefore(this.minBirthdayMoment)) {
          return 'Sorry, you must be younger than 150 years old';
        }
        if (value.isAfter(this.maxBirthdayMoment)) {
          return 'Sorry, you must be older than 14 years old';
        }
      }

    }

  });
});
