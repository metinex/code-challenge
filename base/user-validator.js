define(['base/validator', 'moment', 'util/assign'], function(Validator, moment, assign){
  var userValidator = {
    password : {
      required: true,
      minLength: 6
    },

    repeatPassword : {
      equalTo: 'password',
      msg: 'The passwords does not match'
    }};
  return assign(userValidator, Validator);
});
