
SOURCES := $(shell find lib -name '*.js')
TESTS := $(shell find test -name '*.js')

ROLLUP=node_modules/.bin/rollup
UGLIFY=node_modules/.bin/uglifyjs
BROWSERIY=node_modules/.bin/browserify
MOCHA=node_modules/.bin/mocha
JSHINT=node_modules/.bin/jshint
ISTANBUL=node_modules/.bin/istanbul
COVERALLS=node_modules/.bin/coveralls

all: run-tests dist

run-tests: build-tests
	testem ci

run-tests-in: build-tests
	testem ci -l ${ENV}

run-node-test: build-tests
	${MOCHA} -r dist-test/test-node.js -R tap dist-test/test-bundle.js

run-coverage-test: build-tests
	${ISTANBUL} cover node_modules/mocha/bin/_mocha -r dist-test/test-node.js dist-test/test-bundle.js

check-coverage: run-coverage-test
	${ISTANBUL} check-coverage --lines 100 --function 100 --statements 100 --branches 100

upload-coverage-results: run-coverage-test
	${COVERALLS} < coverage/lcov.info

build-tests: dist-test/pouchdb-bundle.js dist-test/test-bundle.js

dist-test/pouchdb-bundle.js: dist-test/pouchdb.js
	${BROWSERIY} $< -o $@ -s PouchDB

dist-test/test-bundle.js: test/test.js $(TESTS) index.js $(SOURCES)
	${JSHINT} $^
	./build.js buildTestBundle

dist: check-coverage dist/pouchdb.scratch.js dist/pouchdb.scratch.min.js

dist/pouchdb.scratch.js: index.js $(SOURCES)
	${JSHINT} $^
	${ROLLUP} -i $< --format umd --name "pouchdb-scratch" -o $@

dist/pouchdb.scratch.min.js: dist/pouchdb.scratch.js
	${UGLIFY} $< -m -c -o $@

clean-tests:
	-rm dist-test/pouchdb-bundle.js dist-test/test-bundle.js


