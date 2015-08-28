
import { enqueue } from '../utils';

export default function info(callback) {
  enqueue(callback, null, {
    type: 'scratch pad',
    name: this._dbName
  });
}
