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
    .directive('solrPathBreadcrumb', function() {
        return {
            restrict: 'E',
            scope: {
                breadcrumb: '=',
                path: '@',
            },
            templateUrl: 'directives/solr-path-breadcrumb.html'
        };
    })
    .directive('solrApiHelper',function() {
        return {
            restrict: 'E',
            scope: {
                solrResponse: '='
            },
            templateUrl: 'directives/solr-api-helper.html'
        };
    })
    /*
    PARENT SCOPE DIRECTIVES
    These directives depend on certain objects/function being present in the
    parent scope.
     */
    .directive('solrAutoComplete',function() {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'directives/solr-auto-complete.html'
        };
    })
;