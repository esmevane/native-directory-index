'use strict';

var _chai = require('chai');

var _index = require('./index');

describe('Root file', function () {
  it('exports Commands', function () {
    (0, _chai.expect)(_index.Commands).to.be.ok;
  });

  it('exports Config', function () {
    (0, _chai.expect)(_index.Config).to.be.ok;
  });

  it('exports Logger', function () {
    (0, _chai.expect)(_index.Logger).to.be.ok;
  });
});