
var expect = chai.expect;

describe('A scratch DB', function () {
  beforeEach(function () {
    this.dbName = 'test' + new Date().getTime();
    this.db = new PouchDB({adapter: 'scratch', name: this.dbName});

    return this.db;
  });
  it('can be destroyed without an option', function () {
    this.db._db.should.be.an('object');
    var self = this;
    return this.db.destroy().then(function () {
      expect(self.db._db).to.be.null;
    });
  });
  /* istanbul ignore next */
  it.skip('can be destroyed with an option object (skipped due to pouchdb/pouchdb#4219)',
      function () {
    this.db._db.should.be.an('object');
    var self = this;
    return this.db.destroy({asd: 1}).then(function () {
      expect(self.db._db).to.be.null;
    });
  });
});
