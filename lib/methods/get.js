
import debug from '../debug';

export default function get(id, opts, callback) {
  debug('_get', id, opts);

  let api = this;
  let metadata = api._db[id];

  if (typeof metadata === 'undefined') {
    callback({status: 404});
  } else {
    callback(null, {
      doc: metadata.doc,
      metadata
    });
  }
}
