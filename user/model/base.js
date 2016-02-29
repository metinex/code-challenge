define([
  'base/model',
  'util/global',
  'moment',
  'util/keys'
], function (BaseModel, global, moment, keys) {

  return BaseModel.extend({

    defaults: {
      bio : '',
      username : '',
      fullName : '',
      password : '',
      interests : '',
      birthday : moment().subtract(14, 'years').toISOString()
    },

    initialize : function() {
      var context = this;

      this.currentMoment = moment();
      this.minBirthdayMoment = moment().subtract(150, 'years');
      this.maxBirthdayMoment = moment().subtract(14, 'years');

      this.listenTo(this, 'change', function (model) {
        context.isValid(keys(model.changed));
      });
      this.listenTo(this, 'change:birthdayScreen', function (model) {
        context.isValid(['birthdayScreen']);
      });

      return BaseModel.prototype.initialize.apply(this, arguments);
    },

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
    }

  });
});
