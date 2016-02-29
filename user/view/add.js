define([
  'util/global',
  'underscore',
  'user/view/base',
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
    name: 'user/view/add',
    asyncRender : null,

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

      this.asyncRender = new global.Promise(function(resolve, reject) {
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
            reject(error);
            global.console.error(error);
          })
          .then(function () {
            context.configureValidation(context);
            resolve(context);
          })
          .catch(function (error) {
            reject(error);
            global.console.error(error);
          });
      });

      return this;
    },

    onSubmit : function(redirect) {
      redirect = typeof redirect === 'boolean' ? redirect : true;

      var parent = UserView.prototype.onSubmit.apply(this, arguments);

      if (parent === false) {
        console.log(parent, this.model.attributes);
        return false;
      }

      this.collection.add(this.model);

      if (redirect === true) {
        Backbone.history.navigate('success/' + this.model.cid, {
          trigger: true
        });
      }

      return true;
    },

    onReset : function() {
      var
        context = this,
        args = arguments;

      return requirePromise(['util/bootbox-confirm'])
        .then(function(prompt) {
          return prompt('Are sure to clear?');
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
