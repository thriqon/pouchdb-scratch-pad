PouchDB Scratch Pad Adapter
===========================

[![Build Status](https://travis-ci.org/thriqon/pouchdb-scratch-pad.svg)](https://travis-ci.org/thriqon/pouchdb-scratch-pad)
[![Coverage Status](https://coveralls.io/repos/thriqon/pouchdb-scratch-pad/badge.svg?branch=use-coveralls&service=github)](https://coveralls.io/github/thriqon/pouchdb-scratch-pad?branch=use-coveralls)

Small and fast in-memory adapter for PouchDB. Perfect for caches and testing environments,
where persistence is not neccessary.

Usage
-----

Firstly, include the plugin into your environment. In the browser, add it via a `script`
tag below the PouchDB inclusion:

```html
<script src="pouchdb.min.js"></script>
<script src="pouchdb.scratch.min.js"></script>
```

In Node, you have to `require` the plugin and register it with PouchDB, like so:

```js
var PouchDB = require('pouchdb');
PouchDB.adapter('scratch', require('pouchdb-scratch-pad'));
```

Afterwards, you can create Pouches that live completely in memory (and are thrown away
on page reload) by setting `adapter` to `'scratch'`:

```js
var scratchpad = new PouchDB({adapter: 'scratch', name: 'my-first-scratch'});
```

An anonymous PouchDB can be created by setting the name to the empty string. It will
only ever be accessible with this instance. Any subsequent calls to `new PouchDB` will
give a new and fresh instance.

```js
var anonymousScratchPad = new PouchDB({adapter: 'scratch', name: ''});
```

Building
--------

    npm install
    make dist

The code is then available in `dist/pouchdb.scratch.js` and `dist/pouchdb.scratch.min.js`.

Testing
-------

Tests are runnable using Testem:

    testem

They are run in Node and PhantomJS by default, but you can connect additional browser
by pointing them to `localhost:7357`.

Contributing
------------

This is a plugin to PouchDB. As such, please try to adhere to the coding style from
that project. Their Code of Conduct applies to this project as well.

License
-------

Similar to PouchDB, the code is released under the Apache 2.0 License. The terms
are available in this directory in `LICENSE`.

