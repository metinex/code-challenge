define([
  'base/collection',
  'buddy/model/buddy'
], function(BaseCollection, BuddyModel) {
  return BaseCollection.extend({
    model : BuddyModel
  });
});
