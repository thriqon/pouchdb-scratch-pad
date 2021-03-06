/*jshint expr:true */
/* global chai *//* global PouchDB */


import ScratchPouch from '../index';
before(function () {
  chai.should();

  /* istanbul ignore next */
  if (typeof window === 'undefined') {
    // manually register adapter for NodeJS
    PouchDB.adapter('scratch', ScratchPouch);
  }
});

import './unit';
import './utils/enqueue';
import './integration';
