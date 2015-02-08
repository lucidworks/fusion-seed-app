/**
 * Created by evanpease on 2/7/15.
 */

var module_name = 'fusionSeed.viewWfmSearch';

angular.module(module_name)
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