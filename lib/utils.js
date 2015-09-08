
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

export function padToEight(number) {
  return ("0000000"+number).slice(-8);
}

export function random16ByteNumber() {
  function random8String() {
    return padToEight(Math.round(Math.random() * Math.pow(2, 32)).toString(16).substr(0,8));
  }

  return [random8String(), random8String(), random8String(), random8String()].join('');
}
