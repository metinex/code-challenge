define(['base/collection', 'user/model'], function (BaseCollection, UserModel) {
  return BaseCollection.extend({
    model: UserModel
  });
});
