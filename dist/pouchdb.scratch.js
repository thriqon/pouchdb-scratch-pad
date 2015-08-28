(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pouchdb-scratch', ['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.pouchdbScratch = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  var _ScratchPouch = 5;

  function Database() {
    return _ScratchPouch;
  }

  //var utils = require('../pouch-utils');
  var databases = {};

  function getDatabase(name) {
    if (databases[name]) {
      return databases[name];
    } else {
      return databases[name] = new Database();
    }
  }

  function ScratchPouch(opts) {
    var api = this;

    api._db = getDatabase(opts.name);
    api.type = function () {
      return 'scratch';
    };
  }

  /* ScratchPouch is always possible */
  ScratchPouch.valid = function () {
    return true;
  };

  /* istanbul ignore next */
  if (typeof window !== 'undefined' && window.PouchDB) {
    window.PouchDB.adapter('scratch', ScratchPouch);
  }

  module.exports = ScratchPouch;
});
