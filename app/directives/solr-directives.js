/**
 * Created by evanpease on 2/7/15.
 */

angular.module('solr.Directives', [])
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
            templateUrl: 'directives/solr-facet-field-accordian.html'
        };
    })
    .directive('solrPathHierarchyFacetField', function() {
        return {
            restrict: 'E',
            scope: {
                facetData: '=',
                facetName: '@',
                label: '@',
                isFacetFilterOpen: '=',
                pathSeparator: '=',
                createLink: '='
            },
            templateUrl: 'directives/solr-path-hierarchy-facet-field-accordian.html'
        };
    })
    .directive('solrAutoComplete',['$http'],function($http) {
        return {
            restrict: 'E',
            scope: {
               states: '='
            },
            templateUrl: 'directives/solr-auto-complete.html'
        }
    })
;