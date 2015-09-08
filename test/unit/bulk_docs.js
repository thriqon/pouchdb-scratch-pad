
describe('_bulkDocs', function () {
  var expect = chai.expect;

  beforeEach(function () {
    this.scratchPad = new PouchDB({adapter: 'scratch', name: ''});
    return this.scratchPad;
  });

  it('exists', function () {
    expect(this.scratchPad._bulkDocs).to.be.a('function');
  });

  describe('when creating first revision the document', function () {
    beforeEach(function () {
      return this.scratchPad.bulkDocs({
        docs: [
          {_id: "single", foo: 'bar'},
          {_id: "other-single"}
        ]
      });
    });
    it('is an object', function () {
      expect(this.scratchPad._db.single).to.be.an('object');
      expect(this.scratchPad._db['other-single']).to.be.an('object');
    });
  });
});
