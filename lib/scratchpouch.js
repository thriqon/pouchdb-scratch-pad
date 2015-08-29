
import debug from './debug';
import _destroy from './methods/destroy';
import _get from './methods/get';
import _info from './methods/info';

import { enqueue } from './utils';

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
  api._get = _get;
  api._info = _info;

  enqueue(callback, null, "ok");
}


/* ScratchPouch is always possible */
ScratchPouch.valid = function () { return true; };

export default ScratchPouch;
