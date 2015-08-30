
export var enqueue;

/* istanbul ignore else */
if (typeof process !== 'undefined') {
  enqueue = function (cb, fst, scnd) {
    process.nextTick(function () {
      cb(fst, scnd);
    });
  };
} else {
  /* istanbul ignore next */
  enqueue = function (cb, fst, scnd) {
    setTimeout(function () {
      cb(fst, scnd);
    }, 0);
  };
}


