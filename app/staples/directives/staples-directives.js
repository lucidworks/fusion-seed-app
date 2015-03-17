
angular.module('staples.Directives', [])

    /*
     staples DIRECTIVES
     Directives for the staples Pilot
     */
    .directive('staplesSaleFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'staples/directives/staples-sale-filter.html'
        };
    })
    .directive('staplesSearchWithinResultsFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'staples/directives/staples-search-within-results.html'
        };
    })
    .directive('staplesNotification', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'staples/directives/staples-notification.html'
        };
    })
    .directive('staplesProductResultItem', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'staples/directives/staples-product-result-item.html'
        };
    })
    .directive('staplesSpellSuggest', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'staples/directives/staples-spell-suggest.html'
        };
    })
    .directive('staplesAutoComplete', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'staples/directives/staples-auto-complete.html'
        };
    });