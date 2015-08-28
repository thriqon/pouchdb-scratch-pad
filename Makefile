
SOURCES := $(shell find lib -name '*.js')
TESTS := $(shell find test -name '*.js')

BABEL=node_modules/.bin/babel
ROLLUP=node_modules/.bin/rollup
UGLIFY=node_modules/.bin/uglifyjs
BROWSERIY=node_modules/.bin/browserify
MOCHA=node_modules/.bin/mocha
JSHINT=node_modules/.bin/jshint
ISTANBUL=node_modules/.bin/istanbul

all: run-tests dist

run-tests: build-tests
	testem ci

run-tests-in: build-tests
	testem ci -l ${ENV}

run-node-test: build-tests
	${MOCHA} -r dist-test/test-node.js -R tap dist-test/test-bundle.js

run-coverage-test: build-tests
	${ISTANBUL} cover node_modules/mocha/bin/_mocha -r dist-test/test-node.js dist-test/test-bundle.js
	${ISTANBUL} check-coverage --lines 100 --function 100 --statements 100 --branches 100

build-tests: dist-test/pouchdb-bundle.js dist-test/test-bundle.js

dist-test/pouchdb-bundle.js: dist-test/pouchdb.js
	${BROWSERIY} $< -o $@ -s PouchDB

dist-test/test-bundle.js: test/test.js $(TESTS) index.js $(SOURCES)
	${JSHINT} $^
	${ROLLUP} -i $< | ${BABEL} -m ignore -o $@

dist: run-coverage-test dist/pouchdb.scratch.js dist/pouchdb.scratch.min.js

dist/pouchdb.scratch.js: index.js $(SOURCES)
	${JSHINT} $^
	${ROLLUP} -i $< | ${BABEL} -m umd --module-id "pouchdb-scratch" -o $@

dist/pouchdb.scratch.min.js: dist/pouchdb.scratch.js
	${UGLIFY} $< -m -c -o $@

clean-tests:
	-rm dist-test/pouchdb-bundle.js dist-test/test-bundle.js


