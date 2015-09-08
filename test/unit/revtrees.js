
describe('_getRevisionTree compared to local._getRevisionTree', function () {
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

  describe('when called for a single-revision document', function () {
    beforeEach('store documents in databases', function () {
      var self = this;
      return Promise.all(['local', 'scratchPad']
          .map(function (id) { return self[id]; })
          .map(function (db) { return db.put({_id: 'single', a: 1}); }));
    });
    it('scratch gives an answer', function () {
      return getRevisionTree(this['scratchPad'], "single")
        .then(function (answer) { answer.should.be.ok; });
    });
    it('default adapter gives an answer', function (){
      return getRevisionTree(this['local'], "single")
        .then(function (answer) { answer.should.be.ok; });
    });
    it('both answer give the same answer', function () {
      return Promise.all([
        getRevisionTree(this['scratchPad'], "single"),
        getRevisionTree(this['local'], "single")
      ]).then(function (answers) {
        answers[0][0].ids[0] = "000";
        answers[1][0].ids[0] = "000";
        answers[0].should.be.eql(answers[1]);
      });
    });
  });
});
