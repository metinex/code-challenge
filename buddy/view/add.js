define([
  'util/global',
  'user/view/add',
  'base/view',
  'util/require-promise',
  'util/assign',
  'util/shared-instance',
  'util/promise'
], function (global, UserAddView, BaseView, requirePromise, assign, getInstance) {

  /**
   * BuddyAddView
   * @module
   * @param {Object} options - View options including deps.
   * @returns {Object} Returns context
   */
  return UserAddView.extend({

    customTag : 'buddy-add',
    disableRenderOnChange : true,

    initialize : function(options) {
      BaseView.prototype.initialize.apply(this, arguments);

      this.collection = getInstance('buddiesCollection', this.deps.Collection);

      return this;
    },

    templateData : function() {
      var templateData = {
        buddy : assign(this.model.attributes, {
          birthdayScreen : this.model.get('birthdayScreen')
        })
      };
      return templateData;
    },

    onSubmit : function() {
      var isValid = this.model.isValid(true);

      if (isValid === false) {
        return false;
      }

      this.collection.add(this.model);
      Backbone.history.navigate('buddies', {
        trigger : true
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
