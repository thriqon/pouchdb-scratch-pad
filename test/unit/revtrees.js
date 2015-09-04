
describe('_getRevisionTree compared to memdown._getRevisionTree', function () {
  beforeEach(function () {
    this.local = new PouchDB({name: new Date().getTime().toString(36)});
    this.scratchPad = new PouchDB({adapter: 'scratch', name: ''});
    return Promise.all([this.local, this.scratchPad]);
  });
  afterEach(function () {
    return this.local.destroy();
  });

  ['local', 'scratchPad'].forEach(function (dbId) {
    it('when called for a non existing document ' + dbId + ' rejects', function () {
      var db = this[dbId];
      return new Promise(function (resolve, reject) {
        db._getRevisionTree("__nonexistent", function (err) {
          /* istanbul ignore else */
          if (err) { resolve(err); } else { reject("should not resolve"); }
        });
      }).then(function (error) {
        error.should.be.eql(PouchDB.Errors.MISSING_DOC);
      });
    });
  });
});
