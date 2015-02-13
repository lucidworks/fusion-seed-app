
angular.module('wfm.Directives', [])

    /*
     WFM DIRECTIVES
     Directives for the WFM Pilot
     */
    .directive('wfmSaleFilter', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'directives/wfm-sale-filter.html'
        };
    });