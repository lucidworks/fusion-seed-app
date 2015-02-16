
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
    });