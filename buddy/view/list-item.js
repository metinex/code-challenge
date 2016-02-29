define([
  'base/view',
  'util/shared-instance',
  'util/assign',
  'util/require-promise',
  'util/global'
], function(BaseView, getInstance, assign, requirePromise, global) {

  return BaseView.extend({

    name: 'buddy/view/list-item',
    events : {
      'click button.btn-prioritize' : function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.togglePrioritize();
      },
      'click button.btn-trash' : function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.deleteItem();
      }
    },

    render: function(){
      BaseView.prototype.render.apply(this, arguments);
    },

    togglePrioritize : function() {
      var prioritized = this.model.get('prioritized');
      this.model.set('prioritized', prioritized ? false : true);
    },

    onChange : function(){
      BaseView.prototype.render.apply(this, arguments);
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

    deleteItem : function() {
      var
        context = this,
        args = arguments;

      require(['bootstrap-bootbox'], function(bootbox){
        function bootbox_confirm(msg, callback_success, callback_cancel) {
          var d = bootbox.confirm({message:msg, show:false, callback:function(result) {
            if (result)
              callback_success();
            else if(typeof(callback_cancel) == 'function')
              callback_cancel();
          }});

          d.on("show.bs.modal", function(event) {

            // adjusting the top of modal along with deleted item
            var offsetEl = context.$el.offset();
            var top = offsetEl.top - 50;
            var windowHeight = $(window).height();
            if(windowHeight - top < 100 ){
              top = top - 50;
            } else if (windowHeight - top < 150){
              top = top - 25;
            }

            $(event.target).offset({
                top: top,
                left: offsetEl.left
              //context.$el.offset().left
            });
            //making the size of modal the same with deleted item
            var widthEl =  context.$el.width();
            $(event.target).width(widthEl);

            //workaround for the mismatch between bootstrap-bootbox div element and bootstrap .modal-dialog
            $(event.target).find('.modal-dialog').width(widthEl);
          });
          return d;
        }
        bootbox_confirm("You want to delete?", function(){
          _.debounce(context.model.destroy());
          context.destroy();
        }, function(){
        }).modal('show');
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
    }

  });
});
