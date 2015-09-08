
SOURCES := $(shell find lib -name '*.js')
TESTS := $(shell find test -name '*.js')
UTILS := build.js dist-test/bind-polyfill.js dist-test/pouchdb.js
COMPILED_TESTS := dist-test/pouchdb-bundle.js dist-test/test-bundle.js dist-test/test-node.js

REPORTER=tap

ROLLUP=node_modules/.bin/rollup
UGLIFY=node_modules/.bin/uglifyjs
BROWSERIY=node_modules/.bin/browserify
MOCHA=node_modules/.bin/mocha
JSHINT=node_modules/.bin/jshint
ISTANBUL=node_modules/.bin/istanbul
COVERALLS=node_modules/.bin/coveralls

all: run-tests dist

coverage/lcov.info: $(COMPILED_TESTS)
	${ISTANBUL} cover node_modules/mocha/bin/_mocha -r dist-test/test-node.js dist-test/test-bundle.js

dist-test/pouchdb-bundle.js: dist-test/pouchdb.js
	${BROWSERIY} $< -o $@ -s PouchDB

dist-test/test-bundle.js: test/test.js $(TESTS) index.js $(SOURCES)
	${JSHINT} $^
	./build.js buildTestBundle

dist/pouchdb.scratch.js: index.js $(SOURCES)
	${JSHINT} $^
	${ROLLUP} -i $< --format umd --name "pouchdb-scratch" -o $@

dist/pouchdb.scratch.min.js: dist/pouchdb.scratch.js
	${UGLIFY} $< -m -c -o $@


dist: check-coverage dist/pouchdb.scratch.js dist/pouchdb.scratch.min.js

check-coverage: coverage/lcov.info
	${ISTANBUL} check-coverage --lines 100 --function 100 --statements 100 --branches 100

upload-coverage-results: coverage/lcov.info
	${COVERALLS} < $<

run-tests: $(COMPILED_TESTS)
	testem ci

build-tests: $(COMPILED_TESTS)

run-tests-in: $(COMPILED_TESTS)
	testem ci -l ${ENV}

run-node-test: $(COMPILED_TESTS)
	${MOCHA} -r dist-test/test-node.js -R ${REPORTER} dist-test/test-bundle.js

clean-tests:
	-rm dist-test/pouchdb-bundle.js dist-test/test-bundle.js
