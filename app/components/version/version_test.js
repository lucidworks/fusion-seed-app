'use strict';

describe('fusionSeed.version module', function() {
  beforeEach(module('fusionSeed.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
