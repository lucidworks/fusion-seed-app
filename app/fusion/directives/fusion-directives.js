
angular.module('fusion.Directives', [])

    /*
     ecomm DIRECTIVES
     Directives for the ecomm Pilot
     */
    .directive('fusionClickSimulator', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'fusion/directives/click-simulator.html'
        };
    })
    .directive('fusionRunAggr', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'fusion/directives/btn-run-aggr.html'
        };
    });;