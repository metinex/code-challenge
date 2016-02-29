define([
  'base/model'
], function(BaseModel) {
  return BaseModel.extend({

    defaults : {
      sortBy : 'defaultOrder',
      filterText : '',
      filterPriority : false
    },

    computeds : {
      filterPriorityClass : {
        deps : ['filterPriority'],
        get : function (filterPriority) {
          return filterPriority ? 'star' : 'star-empty';
        }
      },
      filterPriorityChecked : {
        deps : ['filterPriority'],
        get : function (filterPriority) {
          return filterPriority ? ' checked' : '';
        }
      }
    }

  });
});
