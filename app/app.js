'use strict';

// Declare app level module which depends on views, and components
angular.module('fusionSeed', [
  'ngRoute',
  'ui.bootstrap',
  'fusionSeed.viewSearch',
    'fusionSeed.viewWfmSearch',
  'fusionSeed.view1',
  'fusionSeed.view2',
  'fusionSeed.version'
]).
config(['$routeProvider', function($routeProvider) {
  //$routeProvider.otherwise({redirectTo: '/search'});
}]);
