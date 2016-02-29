/**
 * Bootstrapping the application
 * @module app/main
 */
require.config({
  baseUrl : '/',
  paths : {
    mocha : '//cdnjs.cloudflare.com/ajax/libs/mocha/2.4.5/mocha.min',
    'mocha-css' : '//cdnjs.cloudflare.com/ajax/libs/mocha/2.4.5/mocha.min',

    /**
     * Chai is a BDD / TDD assertion library
     * @see http://chaijs.com/
     */
    chai : '//cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.min',
    /**
     * Chai Assertion Matchers for Backbone.js
     * @see https://github.com/matthijsgroen/chai-backbone
     */
    'chai-changes' : '//rawgit.com/matthijsgroen/chai-changes/master/chai-changes',
    'chai-backbone' : '//rawgit.com/matthijsgroen/chai-backbone/master/chai-backbone',

    'sinon' : '//cdnjs.cloudflare.com/ajax/libs/sinon.js/1.15.4/sinon.min',

    /**
     * A RequireJS CSS loader plugin to allow CSS requires and optimization
     * @see https://github.com/guybedford/require-css*
     */
    css : 'https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.8/css.min',
    /**
     * @see https://github.com/requirejs/text
     * An AMD loader plugin for loading text resources
     */
    text : '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',

    underscore : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',

    jquery : '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min',

    backbone : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min',
    /**
     * Deep get/set, bindings and computed model attributes for Backbone
     * @see https://github.com/ZaValera/backbone.ribs
     */
    'backbone-ribs' : '//cdnjs.cloudflare.com/ajax/libs/backbone.ribs/0.2.2/backbone.ribs.min',

      /**
       * Plugin to Backbone.js to allow for model fixtures
       * @see https://github.com/huffingtonpost/backbone-fixtures
       */
    'backbone-fixtures' : '//rawgit.com/huffingtonpost/backbone-fixtures/master/backbone-fixtures',

    /**
     * A validation plugin for Backbone.js that validates both your model as well as form inpu
     * @see https://github.com/thedersen/backbone.validation
     */
    'backbone-validation' : '//cdnjs.cloudflare.com/ajax/libs/backbone.validation/0.11.5/backbone-validation-amd-min',

    /**
     * A suite of polyfills supporting the HTML Web Components specs
     * @tutorial http://webcomponents.org/polyfills/
     */
    webcomponents : '//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.20/webcomponents-lite.min',
    /**
     * A polyfill for ES6-style Promises by Jake Archibald
     * @see https://github.com/jakearchibald/es6-promise
     */
    'es6-promise' : '//cdnjs.cloudflare.com/ajax/libs/es6-promise/3.1.2/es6-promise.min',
    /**
     * Parse, validate, manipulate, and display dates in javascript.
     * @see https://github.com/moment/moment
     * @tutorial http://momentjs.com
     */
    moment : '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min',
    bootstrap : '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min',
    'bootstrap-style' : '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min',
    /**
     * Wrappers for JavaScript alert(), confirm() and other flexible dialogs using Twitter's bootstrap framework
     * @see https://github.com/makeusabrew/bootbox
     * @tutorial http://bootboxjs.com
     */
    'bootstrap-bootbox' : '//cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min',
    /**
     * Provides a flexible datepicker widget in the Bootstrap style
     * @see https://github.com/eternicode/bootstrap-datepicker/blob/master/docs/index.rst
     * @tutorial https://github.com/eternicode/bootstrap-datepicker
     */
    'bootstrap-datepicker' : '//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/js/bootstrap-datepicker.min',
    'bootstrap-datepicker-style' : 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker3.min'
  },
  shim : {
    mocha : {
      exports : 'mocha'
    }
  },
  map: {
    '*': {
      'css': 'css'
    }
  }
});


require([
  'backbone',
  'util/global',
  'app/router'
], function (Backbone, global, AppRouter) {

  /**
   * Initializing off app starts here
   * @OPP App is designed to implement MV*  (Model View) Front End Architectural Pattern
   * which attempts to separate the development of user-interfaces (UI) from that of the business logic and behaviour in an application
   */
  new AppRouter();

});
