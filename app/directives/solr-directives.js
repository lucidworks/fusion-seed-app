/**
 * Created by evanpease on 2/7/15.
 */

angular.module('solr.Directives', [])
   .directive('solrFacetField', function() {
        return {
            restrict: 'E',
            scope: {
                facet: '=',
                values: '=',
                isFacetFilterOpen: '=',
                solrParams: '=',
                filterSeparator: '=',
                routeParams: '=',
                clickFacet: '=',
                parseFacetLabel: '=',
                isSelected: '='
            },
            templateUrl: 'directives/solr-facet-field-accordian.html'
        };
    });