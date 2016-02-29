define([
  'test/mocha',
  'test/chai',
  'sinon',
  'moment',

  'user/collection/base',
  'user/view/add',
  'user/model/add',
  'text!user/template/add.html'
], function(mocha, chai, sinon, moment, Collection, AddView, AddModel, addTemplate) {

  describe('User', function() {

    describe('Add', function() {

      describe('View', function() {

        describe('form', function() {
          it('should be available', function() {
            var addView = new AddView({
              deps : {
                Model : AddModel,
                template : addTemplate,
                Collection : Collection
              }
            });

            addView.$el.find('form').length.should.be.at.least(1);
          });

          it('model should be valid', function() {
            var addView = new AddView({
              deps : {
                Model : AddModel,
                template : addTemplate,
                Collection : Collection
              }
            });

            (addView.model.isValid(true)).should.be.equal(true);
          });

          it('wrong entry should be invalid', function() {

            var addView = new AddView({
              deps : {
                Model : AddModel,
                template : addTemplate,
                Collection : Collection
              }
            });


            addView
              .render()
              .asyncRender
                .then(function(addView) {
                  addView.model.set({
                    username : 'test@user.com',
                    fullName : 'Test User',
                    password : 'password',
                    repeatPassword : 'password',
                    birthday : moment().toISOString(),
                    birthdayScreen : moment().format('MM/DD/YYYY')
                  });
                  addView.model.isValid(true).should.be.equal(false);
                })
                .catch(function (error) {
                  throw new Error(error);
                });

            return addView.asyncRender;

          });

          it('correct entry should be valid', function() {

            var addView = new AddView({
              deps : {
                Model : AddModel,
                template : addTemplate,
                Collection : Collection
              }
            });

            addView
              .render()
              .asyncRender
                .then(function() {
                  addView.model.set({
                    username : 'test@user.com',
                    fullName : 'Test User',
                    password : 'password',
                    repeatPassword : 'password',
                    birthday : moment().subtract(20, 'years').toISOString()
                  });
                  addView.model.isValid(true).should.be.equal(true);
                })
                .catch(function (error) {
                  throw new Error(error);
                });

            return addView.asyncRender;

          });

        });

      });

      describe('Model', function () {
        var addModel = new AddModel();

        describe('target', function() {
          it('attribute should be test', function () {
            addModel.should.trigger('change').and.trigger('change:target').when(function() {
              addModel.set({ target : 'test' });
            });
          })
        });

      });

    });

  });
});
