define([
  'base/collection',
  'buddy/model/buddy',
  'buddy/collection/buddies-state',
  'underscore'
], function(BaseCollection, BuddyModel, BuddiesStateCollection, _) {

  return BaseCollection.extend({
    
    model : BuddyModel,

    url : '/buddy/data/read.json',

    counter: 0,

    initialize : function () {
      var context = this;

        // listen to the time when the buddy data is ready
      this.listenTo(this, 'sync', function (collection, models) {

        this.updateCollection(collection, models);

        // keeping track of the time when a new buddy is added
        _.once(this.listenTo(this, 'add', this.updateCollection));
      });

        // keep track of a buddy being deleted
      this.listenTo(this, 'destroy', function(model, collection) {
          // update stored original data when a buddy is deleted
        context.storeOriginalState();
      });

        // listen to the prioritization of a buddy
      this.listenTo(this, 'change:defaultOrder', function () {
          // change the order of collection when a buddy is prioritized or de-prioritized
        this.changeSort();
        this.trigger('reset');
      });
    },

      // updating the collection when an event occurs to change the order of the models
    updateCollection : function (models, collection) {
      // sort by default order as soon as the data is loaded
      this.changeSort();
        // keep original data for future use
      this.storeOriginalState(collection.models);
    },

    stateOriginalCollection : new BuddiesStateCollection(),

    /**
     * Stores current models for restoring it later
     * @param {Array} models array of models to store
     *
     * @OOP Using Memento Pattern for saving a state of collection models
     */
    storeOriginalState : function(models) {
      models = models || this.models;
      return this.stateOriginalCollection.reset(models);
    },

    restoreOriginalState : function(trigger) {
      return this.reset(this.stateOriginalCollection.models, {
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

    selectedSortStrategy : 'defaultOrder',

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
      defaultOrder : function (buddy) {
        if (buddy.get) {
          return buddy.get('defaultOrder') + this.sortStrategies.usernameReverse(buddy);
        }
      }
    },

    /**
     * Chains the available filter methods
     *
     * @OOP Utilizing Chain of Responsibility Pattern for filtering collection
     * @param by {string} method to chain
     * @param value {string, boolean}  value to pass to chained method
     * @returns {object} returns context
     */

    changeSort : function(strategy) {
      this.selectedSortStrategy = strategy || this.selectedSortStrategy;
      this.comparator = this.sortStrategies[this.selectedSortStrategy];
      if (this.selectedSortStrategy === 'defaultOrder') {
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
    },

    resetFilterCollection: function(filterModel){
      this.reset(this.filterCollection(filterModel), { trigger : false } );
      this.changeSort();
      this.trigger('reset');
    },

    filterCollection : function(filterModel){
      var text = filterModel.get('filterText').toLowerCase();
      var priorityValue = filterModel.get('filterPriority');

      var filteredModels = _.filter(this.stateOriginalCollection.models, function(model) {
        return _.some(_.values(model.pick(['username', 'fullName'])), function(value) {
          return ~value.toLowerCase().indexOf(text);
        });
      });

      if ( priorityValue === true ){
        filteredModels = _.filter( filteredModels, function(item){return item.get('prioritized') == true} );
      }
      return filteredModels;

    }

  });
});
