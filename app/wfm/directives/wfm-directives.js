
angular.module('wfm.Directives', [])

    /*
     WFM DIRECTIVES
     Directives for the WFM Pilot
     */
    .directive('wfmSaleFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'wfm/directives/wfm-sale-filter.html'
        };
    })
    .directive('wfmNotification', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'wfm/directives/wfm-notification.html'
        };
    })
    .directive('wfmProductResultItem', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'wfm/directives/wfm-product-result-item.html'
        };
    })
    .directive('wfmRecipeResultItem', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'wfm/directives/wfm-recipe-result-item.html'
        };
    })
    .directive('wfmSpellSuggest', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'wfm/directives/wfm-spell-suggest.html'
        };
    })
    .directive('wfmAutoComplete', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'wfm/directives/wfm-auto-complete.html'
        };
    });