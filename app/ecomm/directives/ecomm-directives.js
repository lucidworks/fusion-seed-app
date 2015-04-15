
angular.module('ecomm.Directives', [])

    /*
     ecomm DIRECTIVES
     Directives for the ecomm Pilot
     */
    .directive('ecommSaleFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'ecomm/directives/ecomm-sale-filter.html'
        };
    })
    .directive('ecommSearchWithinResultsFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'ecomm/directives/ecomm-search-within-results.html'
        };
    })
    .directive('ecommNotification', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'ecomm/directives/ecomm-notification.html'
        };
    })
    .directive('ecommProductResultItem', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'ecomm/directives/ecomm-product-result-item.html'
        };
    })
    .directive('ecommSpellSuggest', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'ecomm/directives/ecomm-spell-suggest.html'
        };
    })
    .directive('ecommAutoComplete', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'ecomm/directives/ecomm-auto-complete.html'
        };
    })
    .directive('ecommChooseDepartmentFacet', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'ecomm/directives/ecomm-choose-department-facet.html'
        };
    });