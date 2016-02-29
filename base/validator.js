define(['moment'], function(moment){
  var validator = {
    username : {
      required: true,
      maxLength: 56,
      pattern: 'email'
    },

    fullName : {
      required: true,
      minLength: 3,
      maxLength: 50,
      pattern: /^[A-Za-z\s]+$/
    },

    birthday : function (value) {
      value = moment(this.get('birthdayScreen'), 'MM/DD/YYYY');
      if (value.isValid() === false) {
        return 'Birthday is required';
      }
      if (value.isBefore(this.minBirthdayMoment)) {
        return 'Sorry, you must be younger than 150 years old';
      }
      if (value.isAfter(this.maxBirthdayMoment)) {
        return 'Sorry, you must be older than 14 years old';
      }
    },

    birthdayScreen : function(value) {
      value = moment(value, 'MM/DD/YYYY');
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

  };
  return validator;
});
