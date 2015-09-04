
describe('_getRevisionTree compared to memdown._getRevisionTree', function () {
  beforeEach(function () {
    this.local = new PouchDB({name: new Date().getTime().toString(36)});
    this.scratchPad = new PouchDB({adapter: 'scratch', name: ''});
    return Promise.all([this.local, this.scratchPad]);
  });
  afterEach(function () {
    return this.local.destroy();
  });

  function getRevisionTree(db, id) {
    return new Promise(function (resolve, reject) {
      db._getRevisionTree(id, function (err, res) {
        /* istanbul ignore next */
        if (err) { reject(err); } else { resolve(res); }
      });
    });
  }

  ['local', 'scratchPad'].forEach(function (dbId) {
    it('when called for a non existing document ' + dbId + ' rejects', function () {
      return getRevisionTree(this[dbId], "__nonexistent")
        .then(/* istanbul ignore next */ function () {
          throw "should not resolve";
        }, function (error) {
          error.should.be.eql(PouchDB.Errors.MISSING_DOC);
        });
    });
  });
});
