'use strict';

angular.module('fusionSeed.version', [
  'fusionSeed.version.interpolate-filter',
  'fusionSeed.version.version-directive'
])

.value('version', '0.1');
