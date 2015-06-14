
angular.module('twitter.Directives', [])

    /*
     twitter DIRECTIVES
     Directives for the twitter Pilot
     */
    .directive('twitterSaleFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-sale-filter.html'
        };
    })
    .directive('twitterSearchWithinResultsFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-search-within-results.html'
        };
    })
    .directive('twitterNotification', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-notification.html'
        };
    })
    .directive('twitterProductResultItem', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-product-result-item.html'
        };
    })
    .directive('twitterSpellSuggest', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-spell-suggest.html'
        };
    })
    .directive('twitterAutoComplete', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-auto-complete.html'
        };
    })
    .directive('twitterChooseDepartmentFacet', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-choose-department-facet.html'
        };
    })
    .directive('twitterResultsPaging', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'twitter/directives/twitter-results-paging.html'
        };
    });