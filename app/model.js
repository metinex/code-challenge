define([
  'base/model'
], function (BaseModel, global, moment) {

  return BaseModel.extend({

    defaults: {
      target: 'home'
    }

  });
});
