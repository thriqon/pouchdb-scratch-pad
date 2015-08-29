#!/usr/bin/env node

var rollup = require('rollup');
var babel = require('babel');
var fs = require('fs');

function removePrefix(x) {
  return x.substr(__dirname.length);
}

var tasks = {
  buildTestBundle: function () {
    Promise.resolve()
      .then(function () { return rollup.rollup({ entry: 'test/test.js' }); })
      .then(function (bundle) { return bundle.generate({ sourceMap: true }); })
      .then(function (transformed) {
        fs.writeFileSync('dist-test/test-bundle.js', transformed.code + "//# sourceMappingURL=test-bundle.js.map");
        var map = transformed.map;
        map.sources = map.sources.map(removePrefix);

        fs.writeFileSync('dist-test/test-bundle.js.map', JSON.stringify(map));
      })
      .catch(function (e) { console.error(e); });
  }
};


tasks[process.argv[2]]();
