define([
  'base/collection',
  'buddy/model/buddy',
  'buddy/collection/buddies-state',
  'underscore'
], function(BaseCollection, BuddyModel, BuddiesStateCollection, _) {

  return BaseCollection.extend({
    
    model : BuddyModel,

    url : '/buddy/data/read.json',

    initialize : function () {
      var context = this;

      this.listenTo(this, 'add', function (collection, models) {
        context.changeSort();
        context.saveModelState(models);
      });

      this.listenTo(this, 'sync', function (collection, models) {
        context.changeSort();
        context.saveModelState(models);
      });

      this.listenTo(this, 'destroy', function(model, collection) {
        context.saveModelState();
      });

      this.listenTo(this, 'reset', function () {
        this.changeSort();
      });

      this.listenTo(this, 'change:order', function () {
        this.trigger('reset');
      });
    },

    stateModelsCollection : new BuddiesStateCollection(),

    /**
     * Stores current models for restoring it later
     * @param {Array} models array of models to store
     *
     * @OOP Using Memento Pattern for saving a state of collection models
     */
    saveModelState : function(models) {
      models = models || this.models;
      return this.stateModelsCollection.reset(models);
    },

    restoreModelState : function(trigger) {
      return this.reset(this.stateModelsCollection.models, {
        trigger : trigger ? true : false
      });
    },


    /**
     * @oop Implements sort logic switch with Strategy Pattern
     * @returns {object}
     */
    comparator : function() {
      return this.sortStrategies[this.selectedSortStrategy]
        .apply(this, arguments);
    },

    selectedSortStrategy : 'order',

    sortStrategies : {
      username : function (buddy) {
        return buddy.get('username');
      },
      fullName : function (buddy) {
        return buddy.get('fullName');
      },
      status : function (buddy) {
        return -(buddy.get('statusOrder'));
      },
      usernameReverse : function(buddy) {
        var str = buddy.get('username');
        str = str.toLowerCase();
        str = str.split('');
        str = _.map(str, function(letter) {
          return String.fromCharCode(-(letter.charCodeAt(0)))
        });
        return str;
      },
      order : function (buddy) {
        if (buddy.get) {
          return buddy.get('order') + this.sortStrategies.usernameReverse(buddy);
        }
      }
    },


    filterText : function (text) {
      if (!text || text === '') {
        return this.restoreModelState();
      }

      this.restoreModelState(false);

      var filteredModels = this.filter(function(model) {
        return _.some(_.values(model.pick(['username', 'fullName'])), function(value) {
          return ~value.toLowerCase().indexOf(text);
        });
      });

      this.reset(filteredModels);
    },

    filterPriority : function (priorityOn) {
      if (priorityOn !== true) {
        return false;
      }

      this.reset(this.where({
        prioritized : priorityOn
      }));
    },

    /**
     * Chains the available filter methods
     *
     * @OOP Utilizing Chain of Responsibility Pattern for filtering collection
     * @param by {string} method to chain
     * @param value {string, boolean}  value to pass to chained method
     * @returns {object} returns context
     */
    filterBy : function (by, value) {
      if (typeof this[by] !== 'function') {
        return this;
      }

      this[by](value);
      return this;
    },

    changeSort : function(strategy) {
      this.selectedSortStrategy = strategy || this.selectedSortStrategy;
      this.comparator = this.sortStrategies[this.selectedSortStrategy];
      if (this.selectedSortStrategy === 'order') {
        this.reverseSort(true);
        this.trigger('sort');
      } else {
        this.sort();
      }
    },
    
    reverseSort : function(silent) {
      this.sort({ silent : true });
      this.models = this.models.reverse();
      return silent ? this : this.trigger('reset', this, {});
    }

  });
});
