
describe('An anonymous DB', function () {
  it('is createable', function () {
    return new PouchDB({adapter: 'scratch', name: ''});
  });
  it('is different from another anonymous DB');
});
