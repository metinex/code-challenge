define([
  'backbone',
  'util/global',
  'util/assign',
  'base/model',
  'util/register-tag',
  'jquery',
  'underscore'
], function (Backbone, global, assign, BaseModel, registerTag, $, _) {

  /**
   * BaseView
   * @module
   *
   * @property {object} frag  - An empty DOM Document Fragment
   *
   * @OOP Usage of Prototype-based Inheritance
   */
  return Backbone.View.extend({
    deps : {},
    frag : global.document.createDocumentFragment(),
    model : null,
    rendered : false,
    template : null,
    customTag : false,
    $template : null,
    disableSetDeps : false,
    disableOnChange : false,
    disableAutoModel : false,
    disableAutoRender: false,
    disableAutoTemplate : false,
    disableRenderOnChange : false,
    disableSetupLinksForRouter: false,

    root : Backbone.history.root.replace(/^\//, '').replace(/\/$/, ''),

    constructor : function (options) {

      //implementing WebComponents Custom Tag
      if (typeof this.customTag === 'string') {
        registerTag(this.customTag);
        this.el = this.customTag;
      }

      return Backbone.View.apply(this, arguments);
    },

    initialize : function (options) {
      options = options || {};

      if (options.model) {
        this.disableAutoModel = true;
        this.model = options.model;
      }

      if (this.disableSetDeps === false) {
        this.setDeps(options);
      }

      if (this.disableSetupLinksForRouter === false) {
        this.setupLinksForRouter();
      }

      if (this.disableOnChange === false && this.model) {
        this.listenTo(this.model, 'change', this.onChange);
      }

      if (this.disableAutoRender === false && this.rendered === false) {
        this.rendered = true;
        this.render();
      }

      return this;
    },

    /**
     * Do operations for frag before attaching it to DOM
     * @OOP Utilization of Template Method Pattern
     *
     * @returns {Object} returns context
     */
    beforeRender : function () {},

    /**
     * Standardized render helper, writes templateData into DOM
     * @returns {Object} returns context
     */
    render : function () {
      this.templatejQuery();

      this.beforeRender();

      this.templateFrag();
      this.$el.html(this.frag);

      return this;
    },

    /**
     * Prepares a jQuery DOM template by using the template and template data
     */
    templatejQuery : function () {
      this.$template = $(this.template(this.templateData()));
    },

    templateFrag: function () {
      this.$template.appendTo(this.frag);
    },

    /**
     * Prepares the data for passing it to template
     * @returns {Object} returns the data for template
     */
    templateData : function () {
      return this.model;
    },

    onChange : function () {
      if (this.disableRenderOnChange === false) {
        return this.render();
      }

      return this;
    },

    /**
     * Parses link href attributes and binds them for navigating the router
     * @returns {boolean}
     */
    setupLinksForRouter: function () {
      var context = this;

      if (!Backbone.history) {
        return false
      }
      if (!Backbone.history._hasPushState) {
        return false
      }

      this.cmdPressedDown = false;
      this.delegateEvents(assign(context.events || {}, {
        keyup: function (event) {
          if (event.ctrlKey || event.keyCode === 91) {
            context.cmdPressedDown = true;
          }
        },
        keydown: function (event) {
          if (event.ctrlKey || event.keyCode === 91) {
            context.cmdPressedDown = true;
          }
        },
        'click a': function (event) {
          this.onNavigate($(event.currentTarget), event);
        }
      }));
    },

    /**
     * Navigates the router for passed $link and event if cmd/ctrl is not pressed down
     * @param {object} $link
     * @param {object} event
     * @returns {boolean}
     */
    onNavigate: function ($link, event) {
      // Get the anchor href and protocol
      var
        protocol = this.protocol + "//",
        href = $link.attr('href');

      if (!href) {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('no href found');
        global.console.warn.apply(global.console, args);
        return false;
      }

      // Ensure the protocol is not part of URL, meaning its relative.
      // Stop the event bubbling to ensure the link will not cause a page refresh.
      if (!this.cmdPressedDown && href.slice(protocol.length) !== protocol) {
        event.preventDefault();

        // Note by using Backbone.history.navigate, router events will not be
        // triggered.  If this is a problem, change this to navigate on your
        // router.

        Backbone.history.navigate(href, true);
      }
    },

    /**
     * Simple DI-ish configuration method
     * @param {Object} options pass given options
     * @returns {Object} returns merged dependencies
     */
    setDeps: function (options) {
      options.deps = options.deps || {};
      this.deps = assign({
        Model: BaseModel,
        template: ''
      }, options.deps);

      if (this.disableAutoTemplate === false) {
        this.template = _.template(this.deps.template);
      }
      if (this.disableAutoModel === false) {
        this.model = new this.deps.Model();
      }

      return this.deps;
    },

    /**
     * Reverts Backbone's auto div/tag wrap
     */
    unwrapDiv: function () {
      this.$el = this.$el.children();
      // Unwrap the element to prevent infinitely
      // nesting elements during re-render.
      this.$el.unwrap();
      this.setElement(this.$el);
    },

    /**
     * Unbind and remove element
     * @param removeModel {Boolean} Also destroy model instance if there is any
     */
    destroy : function (removeModel) {
      this.undelegateEvents();
      this.unbind();

      this.$el.removeData().unbind();

      // Remove view from DOM
      this.remove();
    }

  });

});
