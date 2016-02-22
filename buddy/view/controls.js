define([
  'base/view',
  'util/shared-instance',
  'underscore',
  'jquery',
  'bootstrap'
], function(BaseView, getInstance, _, $) {

  return BaseView.extend({

    customTag : 'buddy-controls',
    disableOnChange : true,
    disableSetupLinksForRouter : true,

    events : {
      'click input[type="checkbox"]': function(event) {
        var $checkbox = $(event.currentTarget);
        this.model.set('filterPriority', $checkbox.prop('checked'));
      },
      'keyup input[type="text"]' : function(event) {
        var
          $el = $(event.currentTarget),
          text;
        text = $el.val();
        _.throttle(this.model.set('filterText', text));
      },
      'click #linkSortByOrder' : function (event) {
        event.preventDefault();
        this.model.set('sortBy', 'order');
      },
      'click #linkSortByFullName' : function (event) {
        event.preventDefault();
        this.model.set('sortBy', 'fullName');
      },
      'click #linkSortByUsername' : function (event) {
        event.preventDefault();
        this.model.set('sortBy', 'username');
      },
      'click #linkSortByStatus' : function (event) {
        event.preventDefault();
        this.model.set('sortBy', 'status');
      }
    },

    initialize : function (options) {
      var context = this;

      if (this.initialized === true) {
        return this;
      }
      this.initialized = true;

      BaseView.prototype.initialize.apply(this, arguments);

      this.collection = getInstance('buddiesCollection', this.deps.Collection);

      this.onFilter();
      this.listenTo(this.model, 'change:filterText change:filterPriority', function (model, value) {
        this.onFilter(model, value);
        if (!model.changed.filterText) {
          context.onChange();
        }
      });

      this.listenTo(this.model, 'reset', this.render);

      this.listenTo(this.model, 'change:sortBy', function (model, value) {
        context.collection.changeSort(value);
        context.onChange();
      });

      return this;
    },

    templateData : function () {
      return {
        controls : this.model
      }
    },

    originalModels : {},

    onFilter : function () {

      this.collection
        .filterBy('filterText', this.model.get('filterText'))
        .filterBy('filterPriority', this.model.get('filterPriority'));

    }

  });
});
