

describe('A scratch DB', function () {
  beforeEach(function () {
    this.dbName = 'test' + new Date().getTime();
    this.db = new PouchDB({adapter: 'scratch', name: this.dbName});

    return this.db;
  });
  afterEach(function () {
    return this.db.destroy();
  });
  it('exists', function () {
    this.db.should.exist;
  });
  it('has type "scratch"', function () {
    this.db.type().should.be.equal('scratch');
  });
});
