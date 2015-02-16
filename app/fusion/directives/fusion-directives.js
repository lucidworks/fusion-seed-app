
angular.module('fusion.Directives', [])

    /*
     WFM DIRECTIVES
     Directives for the WFM Pilot
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