
angular.module('demo.Directives', [])

    /*
     demo DIRECTIVES
     Directives for the demo Pilot
     */
    .directive('demoSaleFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-sale-filter.html'
        };
    })
    .directive('demoSearchWithinResultsFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-search-within-results.html'
        };
    })
    .directive('demoNotification', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-notification.html'
        };
    })
    .directive('demoProductResultItem', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-product-result-item.html'
        };
    })
    .directive('demoSpellSuggest', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-spell-suggest.html'
        };
    })
    .directive('demoAutoComplete', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-auto-complete.html'
        };
    })
    .directive('demoChooseDepartmentFacet', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-choose-department-facet.html'
        };
    })
    .directive('demoResultsPaging', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'demo/directives/demo-results-paging.html'
        };
    });