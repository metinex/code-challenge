define([
  'base/view',
  'backbone',
  'util/assign',
  'util/jquery-serialize-object',
  'util/shared-instance'
], function (BaseView, Backbone, assign, $, getInstance) {

  return BaseView.extend({

    initialize: function (options) {
      BaseView.prototype.initialize.apply(this, arguments);

      this.collection = getInstance('usersCollection', this.deps.Collection);

      return this;
    },

    events: {
      'submit form': function (event) {
        event.preventDefault();
        this.onSubmit($(event.target));
      },
      'click #btnReset': function (event) {
        event.preventDefault();
        this.onReset();
      },
      'click input[type=submit]': function (event) {
        event.preventDefault();
        this.onSubmit($(event.target));
      },

      //for simple one-way binding
      'change input': function (event) {
        this.onInput($(event.target));
      },
      'keyup input': function (event) {
        this.onInput($(event.target));
      },
      'focusout input[type=text]': function (event) {
        this.onInput($(event.target));
      },
      'focusout input[type=password]': function (event) {
        this.onInput($(event.target));
      }
    },

    templateData : function() {
      return {
        user : assign(this.model.attributes, {
          birthdayScreen : this.model.get('birthdayScreen')
        })
      };
    },

    configureValidation: function (view) {

      view = view || this;

      assign(Backbone.Validation.callbacks, {

        valid : function (view, attr, selector) {
          var $el = view.$el.find('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

          $group
            .removeClass('has-error')
            .find('.help-block')
            .html('&nbsp;')
            .addClass('invisible');
        },

        invalid : function (view, attr, error, selector) {
          var $el = view.$el.find('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

          $group
            .addClass('has-error')
            .find('.help-block')
            .html(error)
            .removeClass('invisible');
        }

      });

      Backbone.Validation.bind(view);
    },

    validateAll: function () {
      this.model.validate();
      return this.model.isValid(true);
    },

    validateAttribute: function ($element) {
      var fieldName = $element.attr('name');
      return this.model.isValid([fieldName]);
    },

    updateAttribute: function ($element) {
      var fieldName = $element.attr('name');
      return this.model.set(fieldName, $element.val());
    },

    updateAll: function () {
      var context = this;
      this.$el
        .find('input[type=text],input[type=password]')
        .each(function () {
          return context.updateAttribute($(this));
        });
    },

    onInput : function ($element) {

      var
        tagName = $element.prop('tagName'),
        type = $element.prop('type');

      if (tagName === 'FORM') {
        this.updateAll();
        return this.validateAll();
      }

      if (tagName === 'INPUT') {
        if (type === 'submit') {
          this.updateAll();
          return this.validateAll();
        }
      }

      this.updateAttribute($element);
      this.validateAttribute($element);
    },

    onReset: function () {
      return this.model
        .clear()
        .set(this.model.defaults);
    },

    onSubmit: function (event) {
      return this.model.isValid(true);
    }

  });
});
