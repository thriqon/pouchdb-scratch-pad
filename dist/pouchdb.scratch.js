(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.pouchdb-scratch = factory();
}(this, function () { 'use strict';

  var enqueue;

  /* istanbul ignore else */
  if (typeof process !== 'undefined') {
    enqueue = function (cb, fst, scnd) {
      process.nextTick(function () {
        cb(fst, scnd);
      });
    };
  } else {
    /* istanbul ignore next */
    enqueue = function (cb, fst, scnd) {
      setTimeout(function () {
        cb(fst, scnd);
      }, 0);
    };
  }

  function _getRevisionTree(id, callback) {
    var errors = this.constructor.Errors;
    callback(errors.error(errors.MISSING_DOC));
  }

  function info(callback) {
    enqueue(callback, null, {
      type: 'scratch pad',
      name: this._dbName
    });
  }

  /* global PouchDB */

  var debug = PouchDB.debug('pouchdb:scratch');

  function get(id, opts, callback) {
    debug('_get', id, opts);

    enqueue(callback, {status: 404}, null);
  }

  function _destroy (opts, callback) {
    debug('_destroy', opts, callback);


    /* istanbul ignore else *///pouchdb#4219
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }

    this._db = null;

    enqueue(callback, null, "ok");
  }

  var databases = {};

  function getDatabase(name) {
    if (databases[name]) {
      return databases[name];
    } else {
      return (databases[name] = {});
    }
  }

  function ScratchPouch(opts, callback) {
    var api = this;

    debug('instantiated');
    api._db = getDatabase(opts.name);
    api._dbName = opts.name;
    api.type = function () { return 'scratch'; };

    api._destroy = _destroy;
    api._get = get;
    api._info = info;
    api._getRevisionTree = _getRevisionTree;

    enqueue(callback, null, "ok");
  }


  /* ScratchPouch is always possible */
  ScratchPouch.valid = function () { return true; };

  /* istanbul ignore next */
  if (typeof window !== 'undefined' && window.PouchDB) {
    window.PouchDB.adapter('scratch', ScratchPouch);
  }

  return ScratchPouch;

}));