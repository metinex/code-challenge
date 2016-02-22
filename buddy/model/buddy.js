define([
  'user/model',
  'util/assign',
  'moment'
], function (UserModel, assign, moment) {
  return UserModel.extend({

    defaults: assign(UserModel.prototype.defaults, {
      status: 'online',
      extended: false,
      lastOnline: moment(),
      prioritized: false
    }),

    computeds: assign(UserModel.prototype.computeds, {

      extendedClass: {
        deps: ['extended'],
        get: function (extended) {
          return extended ? '' : 'hidden ';
        }
      },

      lastOnlineScreen: {
        deps: ['status', 'lastOnline'],
        get: function (status, lastOnline) {
          return status !== 'offline' ?
            false : moment(lastOnline, moment.ISO_8601).fromNow();
        }
      },

      /**
       * Scores the status
       */
      statusOrder : {
        deps: ['status'],
        get: function (status) {
          var order = 0;
          switch (status) {
            case 'online':
              order = order + 3;
              break;
            case 'idle':
              order = order + 2;
              break;
            case 'busy':
              order = order + 1;
              break;
          }
          return order;
        }
      },

      /**
       * Scores the buddy both with status and prioritization
       */
      order: {
        deps: ['statusOrder', 'prioritized'],
        get: function (statusOrder, prioritized) {
          if (prioritized) {
            statusOrder = statusOrder + 4;
          }

          return statusOrder;
        }
      },

      prioritizedClass: {
        deps: ['prioritized'],
        get: function (prioritized) {
          return prioritized ? 'star' : 'star-empty';
        }
      },

      statusClass: {
        deps: ['status'],
        get: function (status) {
          switch (status) {
            case 'online':
              return 'success';
            case 'idle':
              return 'info';
            case 'busy':
              return 'danger';
            default:
              return 'default'
          }
        }
      }

    }),

  });
});
