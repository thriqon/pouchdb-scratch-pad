
import { padToEight } from '../../lib/utils';

describe("utils::padToEight", function () {
  it('exists', function () {
    padToEight.should.be.a('function');
  });
  it('pads 0 to 00000000', function () {
    padToEight(0).should.be.equal("00000000");
  });
  it('pads 2 to 00000002', function () {
    padToEight(2).should.be.equal("00000002");
  });
  it('pads 12345678 to 12345678', function () {
    padToEight(12345678).should.be.equal("12345678");
  });
});
