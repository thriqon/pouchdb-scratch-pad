
import Database from './database';

//var utils = require('../pouch-utils');
var databases = {};

function getDatabase(name) {
  if (databases[name]) {
    return databases[name];
  } else {
    return (databases[name] = new Database());
  }
}

function ScratchPouch(opts) {
  var api = this;

  api._db = getDatabase(opts.name);
  api.type = function () { return 'scratch'; };
}


/* ScratchPouch is always possible */
ScratchPouch.valid = function () { return true; };

export default ScratchPouch;
