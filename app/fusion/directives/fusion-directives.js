
angular.module('fusion.Directives', [])

    /*
     staples DIRECTIVES
     Directives for the staples Pilot
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