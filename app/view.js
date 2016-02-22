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

      return this;
    },

    onTargetChange : function (model, target) {
      var $target;
      target = model.get('target');

      $target = this.$el
        .find(target)
        .removeClass('hidden')
        .siblings('.section')
        .addClass('hidden');

      this.$el
        .find('.nav li')
        .removeClass('active')
        .filter('.nav-link-' + target)
        .addClass('active');

      return $target;
    }
  });
});
