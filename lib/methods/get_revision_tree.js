
export default function _getRevisionTree(id, callback) {
  var errors = this.constructor.Errors;

  if (this._db[id]) {
    callback(null, this._db[id].revtree);
  } else {
    callback(errors.error(errors.MISSING_DOC));
  }
}
