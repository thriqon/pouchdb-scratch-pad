

import { random16ByteNumber } from '../../lib/utils';

describe("utils::random16ByteNumber", function () {
  it('exists', function () {
    random16ByteNumber.should.be.a('function');
  });
  it('gives a 32 character string', function () {
    random16ByteNumber().length.should.be.equal(32);
  });
  it('gives a hexadecimal number', function () {
    random16ByteNumber().split('').forEach(function (c) {
      ('0123456789abcdef'.split('')).should.contain(c);
    });
  });
});
