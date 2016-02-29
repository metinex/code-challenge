define([
  'base/view',
  'backbone',
  'underscore',
  'css!bootstrap-style'
], function (BaseView, backbone, _) {

  /**
   * AppView
   * @module
   */
  return BaseView.extend({

    customTag : 'app-view',
    disableOnChange : true,
    disableRenderOnChange : true,
    name: 'app/view',

    initialize : function (options) {
      var context = this;

      /**
       * @OOP Inheritance for implementing overloading parent's method
       */
      BaseView.prototype.initialize.apply(this, arguments);

        /**
         * @OOP Usage of Observer Pattern via Backbone's Event handler
         */
      this.listenTo(this.model, 'change:target', function (model, target) {
        context.onTargetChange(model, target);
      });
      this.onTargetChange(this.model, this.model.get('target'));

      return this;
    },

    onTargetChange : function (model, target) {
      var $target;
      target = model.get('target');

      this.$el
        .find('.nav li')
        .removeClass('active')
        .filter('.nav-link-' + target)
        .addClass('active');

      $target = this.$el
        .find(target)
        .removeClass('hidden')
        .siblings('.section')
        .addClass('hidden');

      return $target;
    }
  });
});
