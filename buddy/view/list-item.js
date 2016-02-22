define([
  'base/view',
  'util/shared-instance',
  'util/assign',
  'util/require-promise',
  'util/global'
], function(BaseView, getInstance, assign, requirePromise, global) {

  return BaseView.extend({

    events : {
      'click button.btn-prioritize' : function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.togglePrioritize();
      },
      'click button.btn-trash' : function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.delete();
      }
    },

    templateData : function() {
      return {
        buddy : assign(this.model.attributes, {
          birthdayScreen : this.model.get('birthdayScreen'),
          statusClass : this.model.get('statusClass'),
          extendedClass : this.model.get('extendedClass'),
          prioritizedClass : this.model.get('prioritizedClass'),
          lastOnlineScreen : this.model.get('lastOnlineScreen')
        })
      };
    },

    delete : function() {
      var
        context = this,
        args = arguments;

      return requirePromise(['util/bootbox-confirm'])
        .then(function(prompt) {
          return prompt('Are sure to delete ?');
        })
        .then(function(result) {
          if (result !== true) {
            return false;
          }

          _.debounce(context.model.destroy());
          context.destroy();
        })
        .catch(function(error) {
          global.console.error(error);
        });
    },

    destroy : function() {
      BaseView.prototype.destroy.apply(this, arguments);
      this.navigateBack();
    },

    navigateBack : function() {
      Backbone.history.navigate('buddies', {
        trigger : true
      });
    },

    togglePrioritize : function() {
      var prioritized = this.model.get('prioritized');
      this.model.set('prioritized', prioritized ? false : true);
    }

  });
});
