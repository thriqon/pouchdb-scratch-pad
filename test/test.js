/*jshint expr:true */
/* global chai */

import ScratchPouch from '../index';
chai.should();

describe('ScratchPouch Adapter', function () {
  it('is valid', function () {
    ScratchPouch.valid().should.be.true;
  });
});

