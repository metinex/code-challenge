define([
  'chai',
  'chai-changes',
  'chai-backbone'
], function (chai, chaiChanges, chaiBackbone) {
  chai.should();
  chai.use(chaiChanges);
  chai.use(chaiBackbone);
  return chai;
});
