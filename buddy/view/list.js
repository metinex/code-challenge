define([
  'base/view',
  'util/global',
  'util/shared-instance',
  'underscore',
  'jquery',
  'es6-promise'
], function(BaseView, global, getInstance, _) {
  
  return BaseView.extend({

    disableAutoRender : true,
    disableAutoModel : true,
    disableOnChange : true,
    initialized : false,
    customTag : 'buddy-list',
    itemViews : [],
    rendered : false,
    
    initialize : function(options) {
      var context = this;

      if (this.initialized === true) {
        return this;
      }
      this.initialized = false;


      BaseView.prototype.initialize.apply(this, arguments);

      this.collection = getInstance('buddiesCollection', this.deps.Collection);
      this.collectionFecthed = new global.Promise(function (resolve, reject) {
        try {
          context.listenToOnce(context.collection, 'sync', function() {
            resolve.apply(context, arguments);
          });
          context.collection.fetch();
        } catch (error) {
          reject(error);
        }
      });

      this.collectionFecthed
        .then(function(collection) {

          context.listenTo(collection, 'reset sort', function(collection) {
            context.onChange();
          });
          context.listenTo(collection, 'add', function(collection) {
            context.onChange();
          });
          collection.trigger('reset');

        })
        .catch(function(error) {
          global.console.error(error);
        });

      return this;
    },

    show : function (id) {

      return this.collectionFecthed
        .then(function(collection) {

          var currentActive = collection.findWhere({
            extended : true
          });

          if (currentActive && currentActive.set) {
            currentActive.set('extended', false);
          }

          collection.get(id).set('extended', true);

        })
        .catch(function(error) {
          global.console.error(error);
        })
    },

    beforeRender : function() {

      var context = this,
          $listGroup;

      //destroy current views if there is any
      this.itemViews.forEach(function(itemView) {
        itemView.destroy();
      });
      this.itemViews = [];

      $listGroup = this.$template.find('.list-group');
      $listGroup.empty();

      this.collection.each(function(buddyModel) {

        var
          id = buddyModel.get('id'),
          itemView = new context.deps.ItemView({
            model : buddyModel,
            deps : {
              template : context.deps.itemTemplate
            }
          });

        context.itemViews[id] = itemView;
        $listGroup.append(itemView.el);

      });
    }
  
  });
});
