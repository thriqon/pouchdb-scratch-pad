
import debug from '../debug';
import { enqueue } from '../utils';

export default function get(id, opts, callback) {
  debug('_get', id, opts);

  enqueue(callback, {status: 404}, null);
}
