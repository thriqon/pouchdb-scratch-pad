
/* istanbul ignore next */
global.Promise = global.Promise || require('lie');
global.chai = require('chai');
global.chai.use(require('chai-as-promised'));

global.PouchDB = require('pouchdb');

