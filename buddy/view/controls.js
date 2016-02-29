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
    name: 'buddy/view/controls',
    originalModels : {},

    events : {
      //checkbox for prioritization checked
      'click input[type="checkbox"]': function(event) {
        var $checkbox = $(event.currentTarget);
        this.model.set('filterPriority', $checkbox.prop('checked'));
      },
      //input box for searching/filtering buddies
      'keyup input[type="text"]' : function(event) {
        var
          $el = $(event.currentTarget),
          text;
        text = $el.val();
        this.model.set('filterText', text);
      },
      //sort by default order
      'click #linkSortByOrder' : function (event) {
        event.preventDefault();
        this.model.set('sortBy', 'defaultOrder');
      },
      //sort by Full Name option for sort dropdown
      'click #linkSortByFullName' : function (event) {
        event.preventDefault();
        this.model.set('sortBy', 'fullName');
      },
      //sort by username option for sort dropdown
      'click #linkSortByUsername' : function (event) {
        event.preventDefault();
        this.model.set('sortBy', 'username');
      },
      //sort by status option for sort dropdown
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

      // watching TEXT entered in search input field to update collection to render the list view
      this.listenTo(this.model, 'change:filterText', function (model, value) {
        this.collection.resetFilterCollection(this.model);
      });

      // whatching checkbox for favourite buddies check
      this.listenTo(this.model, 'change:filterPriority', function (model, value) {
        this.collection.resetFilterCollection(this.model);
      });

      // listening whenever sort order changes
      this.listenTo(this.model, 'change:sortBy', function (model, value) {
        context.collection.changeSort(value);
        context.onChange();
        context.collection.trigger('reset');
      });

      // list view will be rendered or re-rendered whenever collection is reset or triggered to be reset
      this.listenTo(this.model, 'reset', function(){
        this.render();
      });

      return this;
    },

    templateData : function () {
      return {
        controls : this.model
      }
    }

  });
});
