/**
 * Module acquiring application wide object instances
 * @module util/shared-intance
 * @OOP: Implementing Factory Pattern sytle function to gather objects instances with Singleton approach
 */
define([], function () {

  var
    SharedSingletonInstance = {

    instances : {},

    createInstance : function (name, Obj, options) {
      if (!Obj) {
        throw new Error('Need a Object to register a shared instance');
      }

      this.instances[name] = new Obj(options);
      return this.instances[name];
    },

    getInstance : function (name, Obj, options) {

      if (!name) {
        throw new Error('Need a unique shared instance name');
      }

      if (this.instances[name]) {
        return this.instances[name];
      }

      if (Obj) {
        return this.createInstance(name, Obj, options);
      }

      return false;
    }

  }, getInstance;

  getInstance = SharedSingletonInstance.getInstance;
  return getInstance.bind(SharedSingletonInstance);

});
