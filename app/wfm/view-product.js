/**
 * Created by evanpease on 2/17/15.
 */
'use strict';

angular.module('fusionSeed.viewWfmProduct', ['ngRoute','solr.Directives', 'wfm.Directives', 'fusion.Directives'])

    .constant("WFM_DEFAULTS", {
        "proxy_url": "http://localhost:9292/",
        "fusion_url": "ec2-54-90-6-131.compute-1.amazonaws.com:8764",
        "pipeline_id": "wfm_poc1-default",
        "collection_id": "wfm_poc1",
        "request_handler": "select",
        "taxonomy_field": "cat_tree",
        "taxonomy_separator": "|",
        "filter_separator": "~",
        "controller_path": "wfm",
        "multi_select_facets": false,
        "collapse_field": "attr_identifier_",
        "aggr_job_id": "wfmClickAggr"
    })

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/wfm/:store/p/:description?/:docid?', {
                templateUrl: 'wfm/view-product.html',
                controller: 'ViewWfmProductCtrl'
            });
    }])

    /*.controller('ViewWfmSearchCtrl', [function() {

     }]);*/

    .controller('ViewWfmProductCtrl', function (WFM_DEFAULTS, $scope, $http, $routeParams, $location, $route, $sce, fusionHttp) {

        //queryPipeline(pipelineId,collectionId,reqHandlr,params)
        fusionHttp.queryPipeline(
            WFM_DEFAULTS.proxy_url,
            WFM_DEFAULTS.fusion_url,
            'wfm_poc1-default',
            'wfm_poc1',
            'select',
                {
                    q: 'pinot noir',
                    'json.nl': 'arrarr',
                    'wt': 'json'
                })
            .success(function(data, status, headers, config) {
                $scope.data = data;
            });

    });