
import debug from '../debug';
import { enqueue } from '../utils';

export default function (opts, callback) {
  debug('_destroy', opts, callback);

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  this._db = null;

  enqueue(callback, null, "ok");
}
