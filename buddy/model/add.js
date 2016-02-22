define([
  'buddy/model/buddy',
  'moment',
  'util/assign'
], function (BuddyModel, moment, assign) {

  return BuddyModel.extend({

    initialize : function () {
      this.currentMoment = moment();
      this.minBirthdayMoment = moment(this.currentMoment)
        .subtract(150, 'years');
      this.maxBirthdayMoment = moment(this.currentMoment)
        .subtract(14, 'years');

      return BuddyModel.prototype.initialize.apply(this, arguments);
    },

    defaults : assign(BuddyModel.prototype.defaults, {
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

  })

});
