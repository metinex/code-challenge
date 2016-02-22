define([
  'base/view',
  'util/shared-instance'
], function (BaseView, getInstance) {
  return BaseView.extend({

    customTag : 'buddy-container',

    initialize: function (options) {
      BaseView.prototype.initialize.apply(this, arguments);

      this.controls();
      this.list(options.id);

      return this;
    },

    controls: function () {

      require([
        'buddy/collection/buddies',
        'buddy/view/controls',
        'buddy/model/controls',
        'text!buddy/template/controls.html'
      ], function (
        BuddiesCollection,
        BuddyControlsView,
        BuddyModelControls,
        BuddyTemplateControls
      ) {

        getInstance('buddyControlsView', BuddyControlsView, {
          deps : {
            Collection : BuddiesCollection,
            Model : BuddyModelControls,
            template : BuddyTemplateControls
          }
        });

      });
    },

    list: function (id) {
      require([
        'buddy/view/list',
        'buddy/collection/buddies',
        'text!buddy/template/list.html',
        'buddy/view/list-item',
        'text!buddy/template/list-item.html'
      ], function (
        BuddyListView,
        BuddiesCollection,
        buddyListTemplate,
        BuddyListItemView,
        buddyListItemTemplate
      ) {

        var buddyListView = getInstance('buddyListView', BuddyListView, {
          deps : {
            View : BuddyListView,
            Collection : BuddiesCollection,
            template : buddyListTemplate,
            ItemView : BuddyListItemView,
            itemTemplate : buddyListItemTemplate
          }
        });

        id = parseInt(id, 10);
        if (isNaN(id) !== true) {
          buddyListView.show(id);
        }

      });
    }

  })
});
