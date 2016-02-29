define([
  'backbone',
  'util/global',
  'jquery',
  'util/shared-instance'
], function(Backbone, global, $, getInstance) {
  return Backbone.Router.extend({

    routes : {
      'test' : 'test',
      'buddies/:id' : 'buddies',
      'success/:id' : 'userEdit',
      'buddy/add' : 'buddyAdd',
      buddies : 'buddies',
      signup : 'userAdd',
      '*actions' : 'app'
    },

    test : function () {

      require(['jquery'], function ($) {
        $(function () {
          $('body').prepend('<div id="mocha"></div>');
          require(['mocha', 'spec/app', 'spec/user'], function (mocha) {
            mocha.run();
          })
        })
      });
    },

    initialize : function() {
      if (!Backbone.History.started) {
        Backbone.history.start({
          pushState: true
        })
      }
    },

    initializeAppView : function(callback) {
      var appView = getInstance('appView');

      callback = typeof callback === 'function' ? callback : function() {
      };

      if (appView) {
        return callback();
      }

      require([
        'app/view',
        'app/model',
        'text!app/template.html'
      ], function(AppView, AppModel, appTemplate) {

        appView = getInstance('appView', AppView, {
          deps : {
            Model : AppModel,
            template : appTemplate
          }
        });

        callback();

      });
    },

    app : function() {
      global.console.info('Navigated to app');
      var appView = getInstance('appView');
      if (appView) {
        return appView;
      }
      this.initializeAppView(function() {
        appView = getInstance('appView');
        appView.model.set('target', 'home');
      });
    },

    userAdd : function() {
      global.console.info('Navigated to userAdd');

      this.initializeAppView(function() {

        appView = getInstance('appView');
        appView.model.set('target', 'user-add');

        require([
          'user/view/add',
          'user/model/add',
          'user/collection/base',
          'text!user/template/add.html'
        ], function(UserAddView, UserAddModel, UserCollection, userAddTemplate) {

          //var userAddView = new UserAddView({
          //  deps : {
          //    Collection : UserCollection,
          //    template : userAddTemplate,
          //    Model : UserAddModel
          //  }
          //});

          userAddView = getInstance('addView', UserAddView, {
            deps : {
              Collection : UserCollection,
              template : userAddTemplate,
              Model : UserAddModel
            }
          });

        });
      });
    },

    userEdit : function(id) {
      global.console.info('Navigated to userEdit', id);

      this.initializeAppView(function() {

        var appView = getInstance('appView');
        appView.model.set('target', 'user-edit');

        require([
          'user/view/edit',
          'user/collection/base',
          'text!user/template/edit.html'
        ], function(UserEditView, UserCollection, userEditTemplate) {

          var userEditView = new UserEditView({
            id: id,
            deps : {
              Collection : UserCollection,
              template : userEditTemplate
            }
          });

        });
      });
    },

    buddies : function(id) {
      global.console.info('Navigated to list', id);
      this.initializeAppView(function() {

        var appView = getInstance('appView');
        appView.model.set('target', 'buddy-container');

        var buddyContainerView = getInstance('buddyContainerView');
        if (buddyContainerView) {
          return buddyContainerView.initialize({
            id : id
          });
        }

        require([
          'buddy/view/container',
          'text!buddy/template/container.html'
        ], function(BuddyContainerView, buddyContainerTemplate) {

          var buddyContainerView = getInstance('buddyContainerView', BuddyContainerView, {
            id: id,
            deps : {
              template : buddyContainerTemplate
            }
          });

        })
      })
    },

    buddyAdd : function() {
      global.console.info('Navigated to list', 'buddiesAdd');
      this.initializeAppView(function() {

        var appView = getInstance('appView');
        appView.model.set('target', 'buddy-add');

        var buddyAddView = getInstance('buddyAddView');

        require([
          'buddy/view/add',
          'buddy/model/add',
          'buddy/collection/buddies',
          'text!buddy/template/add.html'
        ], function(BuddyAddView, BuddyAddModel, BuddiesCollection, buddyAddTemplate) {

          var buddyAddView = getInstance('buddyAddView', BuddyAddView, {
            deps : {
              Model : BuddyAddModel,
              template : buddyAddTemplate,
              Collection : BuddiesCollection
            }
          });

        })
      })
    }

  });
});
