
export default function _getRevisionTree(id, callback) {
  var errors = this.constructor.Errors;
  callback(errors.error(errors.MISSING_DOC));
}
