
import { random16ByteNumber } from '../utils';

export default function (revisions, opts, callback) {
  var self = this;
  revisions.docs.forEach(function (revision) {
    self._db[revision._id] = {revtree: [
      {
        ids: [
          random16ByteNumber(),
          {
            status: "available"
          },
          []
        ],
        pos: 1
      }
    ]};
  });
  callback(null, {});
}
