/**
 * Created by evanpease on 2/7/15.
 */

angular.module('solr.Directives', [])
   .directive('zzzsolrFacetField', function() {
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
    })
    .directive('solrFacetField', function() {
        return {
            restrict: 'E',
            scope: {
                facetData: '=',
                facetName: '@',
                label: '@',
                isFacetFilterOpen: '=',
                clickFacet: '=',
                isSelected: '='
            },
            templateUrl: 'directives/solr-facet-field-accordian2.html'
        };
    })
;