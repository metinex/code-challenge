define([
  'base/model',
  'util/global',
  'moment'
], function (BaseModel, global, moment) {

  return BaseModel.extend({

    computeds: {

      birthdayScreen: {
        deps : ['birthday'],
        get: function (birthday) {
          return moment(birthday, moment.ISO_8601).format('MM/DD/YYYY');
        },
        set: function (value) {
          this.set('birthday', moment(value, 'MM/DD/YYYY').toISOString());
          return value;
        }
      }
    },

    defaults: {
      bio : '',
      username : '',
      fullName : '',
      password : '',
      interests : '',
      birthday : moment().toISOString()
    }

  });
});
