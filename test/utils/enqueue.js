
import { enqueue } from '../../lib/utils';

describe("utils::enqueue", function () {
  it('exists', function () {
    enqueue.should.be.a('function');
  });
  it('executes one job after another', function (done) {
    var value = 0;
    enqueue(function (x, y) {
      value += x * 10 + y;
    }, 2, 3);
    enqueue(function () {
      value.should.be.equal(23);
    });
    enqueue(function (x, y) {
      value += x * 1000 + y * 100;
    }, 4, 5);
    enqueue(function () {
      value.should.be.equal(4523);
    });
    enqueue(done);

    value.should.be.equal(0);
  });
});
