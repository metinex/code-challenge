define([
  'test/mocha',
  'test/chai',
  'sinon',

  'app/view',
  'app/model',
  'text!app/template.html'
], function(mocha, chai, sinon, AppView, AppModel, appTemplate) {

  describe('App', function() {

    describe('View', function () {

      var appView = new AppView({
        deps : {
          Model : AppModel,
          template : appTemplate
        }
      });

      appView.$el.addClass('invisible');

      describe('deps', function() {
        it('should be object', function() {
          appView.deps.should.be.a('object');
        });
      });

      describe('section', function() {
        it('section.home should be available', function() {
          appView.$el.find('section.home').length.should.be.at.least(1);
        });
      });

      describe('user-add', function() {
        it('should be hidden when target is user-add', function() {
          appView.model.set('target', 'user-add');
          (appView.$el.find('user-add').hasClass('hidden')).should.not.be.equal(true);
        });
      });

      describe('onTargetChange', function() {
        it('should be called when target is test', function() {
          appView.should.call('onTargetChange').when(function() {
            appView.model.set('target', 'test');
          });
        });
      });

    });

    describe('Model', function () {
      var appModel = new AppModel();

      describe('target', function() {
        it('attribute should be test', function () {
          appModel.should.trigger('change').and.trigger('change:target').when(function() {
            appModel.set({ target : 'test' });
          });
        })
      });

    });

  });
});
