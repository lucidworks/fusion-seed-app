'use strict';

angular.module('fusionSeed.version', [
  'fusionSeed.version.interpolate-filter',
  'fusionSeed.version.version-directive'
])

//first cut of product demo
.value('version', '0.3');
