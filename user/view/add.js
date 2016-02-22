define([
  'util/global',
  'underscore',
  'user/view',
  'util/require-promise',
  'util/promise'
], function (global, _, UserView, requirePromise) {

  /**
   * UserViewAdd
   * @module
   * @param {Object} options - View options including deps.
   * @returns {Object} Returns context
   */
  return UserView.extend({

    customTag : 'user-add',
    disableRenderOnChange : true,

    /**
     * Renders sign up view.
     * @returns {Object} Returns context
     */
    render : function() {

      var
        context = this,
        $dates;

      UserView.prototype.render.apply(this, arguments);

      $dates = this.$el.find('input.date');

      requirePromise(['bootstrap-datepicker'])
        .then(function ($) {

          $dates
            .datepicker({
              format : 'mm/dd/yyyy',
              endDate : '-14y',
              startDate : '-150y',
              immediateUpdates : true
            });

          return requirePromise(['backbone-validation']);
        })
        .catch(function (error) {
          global.console.error(error);
        })
        .then(function () {
          context.configureValidation(context);
        })
        .catch(function (error) {
          global.console.error(error);
        });

      return this;
    },

    onSubmit : function() {
      var parent = UserView.prototype.onSubmit.apply(this, arguments);

      if (parent === false) {
        return false;
      }

      this.collection.add(this.model);
      Backbone.history.navigate('success/' + this.model.cid, {
        trigger: true
      });

      return true;
    },

    onReset : function() {
      var
        context = this,
        args = arguments;

      return requirePromise(['util/bootbox-confirm'])
        .then(function(prompt) {
          return prompt('Are sure to delete ?');
        })
        .then(function(result) {
          if (result !== true) {
            return false;
          }

          UserView.prototype.onReset.apply(context, args);
          context.render();
        })
        .catch(function(error) {
          global.console.error(error);
        });
    }
  });
});
