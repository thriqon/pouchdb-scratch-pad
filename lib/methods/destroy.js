
import debug from '../debug';

export default function (opts, callback) {
  debug('_destroy', opts, callback);

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  this.emit('destroyed');
  this.constructor.emit('destroyed', opts.name);

  callback(null, "ok");
}
