'use strict';

// Declare app level module which depends on views, and components
angular.module('fusionSeed', [
  'ngRoute',
  'ui.bootstrap',
  'fusionSeed.viewSearch',
  'fusionSeed.viewWfmSearch',
  'fusionSeed.viewWfmProduct',
  'fusionSeed.wfmSettings',
  'fusionSeed.http',
  'fusionSeed.view1',
  'fusionSeed.view2',
  'fusionSeed.version'
])


.config(['$routeProvider', function($routeProvider) {
  //$routeProvider.otherwise({redirectTo: '/search'});
}])

.filter('orderObjectBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    });



