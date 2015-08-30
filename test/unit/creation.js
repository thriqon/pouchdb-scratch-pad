
describe('A scratch DB', function () {
  beforeEach(function () {
    this.dbName = 'test' + new Date().getTime();
    this.db = new PouchDB({adapter: 'scratch', name: this.dbName});

    return this.db;
  });
  it('has an underlying object database', function () {
    this.db._db.should.be.an('object');
  });
  it('shares it with another ScratchPad of the same name', function () {
    var db2 = new PouchDB({adapter: 'scratch', name: this.dbName});
    return db2.then(function () {
      db2._db.should.be.equal(this.db._db);
    });
  });
});
