define(['base/collection', 'user/model/base'], function (BaseCollection, UserModel) {
  return BaseCollection.extend({
    model: UserModel
  });
});
