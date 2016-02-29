define([
  'mocha',
  'css!mocha-css'
], function (mocha) {
  mocha.checkLeaks();
  mocha.setup('bdd');
  mocha.reporter('html');
  return mocha;
});
