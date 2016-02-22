define([
  'util/global',
  'underscore',
  'user/view',
  'util/require-promise',
  'moment'
], function (global, _, UserView, requirePromise, moment) {

  /**
   * UserViewAdd
   * @module
   * @param {Object} options - View options including deps.
   * @returns {Object} Returns context
   */
  return UserView.extend({

    customTag: 'user-edit',
    disableAutoRender : true,
    disableAutoModel : true,

    /**
     * Constructs sign up view.
     * @constructor
     * @param {Object} options - View options including deps.
     * @returns {Object} Returns context
     */
    initialize : function (options) {
      UserView.prototype.initialize.apply(this, arguments);

      this.model = this.collection.get(options.id);

      if (!this.model) {
        Backbone.history.navigate('signup', {
          trigger: true
        });
      }

      this.render();

      return this;
    },

    templateData: function () {
      return {
        user : this.model
      };
    },

    onSubmit : function () {
      var parent = UserView.prototype.onSubmit.apply(this, arguments);

      this.render();

      return parent;
    }
  });
});
