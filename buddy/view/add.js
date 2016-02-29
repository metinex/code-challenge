define([
  'util/global',
  'user/view/add',
  'base/view',
  'user/view/base',
  'util/require-promise',
  'util/assign',
  'util/shared-instance',
  'util/promise'
], function (global, UserAddView, BaseView, UserBaseView, requirePromise, assign, getInstance) {

  /**
   * BuddyAddView
   * @module
   * @param {Object} options - View options including deps.
   * @returns {Object} Returns context
   */
  return UserAddView.extend({

    customTag : 'buddy-add',
    disableRenderOnChange : true,
    name: 'buddy/view/add',

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
          return prompt('Are sure to cancel it?');
        })
        .then(function(result) {
          if (result !== true) {
            return false;
          }

          UserBaseView.prototype.onReset.apply(context, args);
          Backbone.history.navigate('buddies', {
            trigger : true
          });
          context.render();
        })
        .catch(function(error) {
          global.console.error(error);
        });
    }
  });
});
