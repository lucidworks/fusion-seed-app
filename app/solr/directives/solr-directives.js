/**
 * Created by evanpease on 2/7/15.
 */

angular.module('solr.Directives', [])

    /*
    RE-USEABLE DIRECTIVES
    These directives have their own scope which makes them easier to re-use.
    They don't depend on any parent scope.
     */
    .directive('solrFacetField', function() {
        return {
            restrict: 'E',
            scope: {
                facetData: '=',
                facetName: '@',
                label: '@',
                isFacetFilterOpen: '=',
                clickFacet: '=',
                isSelected: '=',
                showValueFilter: '='
            },
            templateUrl: 'solr/directives/solr-facet-field-accordian.html'
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
            templateUrl: 'solr/directives/solr-path-hierarchy-facet-field-accordian.html'
        };
    })
    .directive('solrPathBreadcrumb', function() {
        return {
            restrict: 'E',
            scope: {
                breadcrumb: '=',
                path: '@',
            },
            templateUrl: 'solr/directives/solr-path-breadcrumb.html'
        };
    })
    .directive('solrApiHelper',function() {
        return {
            restrict: 'E',
            scope: {
                solrResponse: '='
            },
            templateUrl: 'solr/directives/solr-api-helper.html'
        };
    });