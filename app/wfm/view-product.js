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
            when('/wfm/:store/p/:description?/:docId?', {
                templateUrl: 'wfm/view-product.html',
                controller: 'ViewWfmProductCtrl'
            });
    }])

    /*.controller('ViewWfmSearchCtrl', [function() {

     }]);*/

    .controller('ViewWfmProductCtrl', function (WFM_DEFAULTS, $scope, $http, $routeParams, $location, $route, $sce, fusionHttp) {


        $scope.q = $routeParams.q;
        $scope.store = $routeParams.store;

        //queryPipeline(pipelineId,collectionId,reqHandlr,params)
        //product document
        fusionHttp.getQueryPipeline(
            WFM_DEFAULTS.proxy_url,
            WFM_DEFAULTS.fusion_url,
            'wfm_poc1-default',
            'wfm_poc1',
            'select',
                {
                    q: 'id:'+$routeParams.docId,
                    'json.nl': 'arrarr',
                    'wt': 'json'
                })
            .success(function(data, status, headers, config) {
                //console.log(data);
                $scope.product = data.response.docs[0];

            });

        //recommendations
        //limit recommendations to the current store
        var fqs = [];
        fqs.push('filters_orig_ss:store/'+$routeParams.store.toLowerCase());
        fusionHttp.getItemsForItemRecommendations(WFM_DEFAULTS.proxy_url,WFM_DEFAULTS.fusion_url,WFM_DEFAULTS.collection_id,$routeParams.docId,fqs)
            .success(function(data, status, headers, config) {
                //console.log(data);
                //$scope.recommendations = data.items;
                var q = "";
                for (var i=0;i<data.items.length;i++) {
                    var item = data.items[i];
                    q+= 'id:'+item.docId+'^'+item.weight + ' ';
                }
                fusionHttp.getQueryPipeline(WFM_DEFAULTS.proxy_url,WFM_DEFAULTS.fusion_url,"wfm_poc1-select",WFM_DEFAULTS.collection_id,"select",
                    {
                        q: q,
                        wt: 'json',
                        fl: 'id,description,brand_s,price,score',
                        rows: '5'
                    }).success(function(data) {
                       $scope.recommendations = data.response.docs;
                    });

                //console.log(q);

        });

        fusionHttp.getItemsForQueryRecommendations(WFM_DEFAULTS.proxy_url,WFM_DEFAULTS.fusion_url,WFM_DEFAULTS.collection_id,$routeParams.q,fqs)
            .success(function(data, status, headers, config) {
                //console.log(data);
                //$scope.recommendations = data.items;
                var q = "";
                console.log("WHAT IS THE DATA");
                console.log(data);
                for (var i=0;i<data.items.length;i++) {
                    var item = data.items[i];
                    q+= 'id:'+item.docId+'^'+item.weight + ' ';
                }
                console.log("WAHT IS Q:" + q);
                fusionHttp.getQueryPipeline(WFM_DEFAULTS.proxy_url,WFM_DEFAULTS.fusion_url,"wfm_poc1-select",WFM_DEFAULTS.collection_id,"select",
                    {
                        q: q,
                        wt: 'json',
                        fl: 'id,description,brand_s,price,score',
                        rows: '5'
                    }).success(function(data) {
                        $scope.recommendations2 = data.response.docs;
                    });

                //console.log(q);

            });

        fusionHttp.getQueriesForItemRecommendations(WFM_DEFAULTS.proxy_url,WFM_DEFAULTS.fusion_url,WFM_DEFAULTS.collection_id,$routeParams.docId,fqs)
            .success(function(data, status, headers, config) {
                //console.log(data);
                //$scope.recommendations = data.items;
                var qs = []
                for (var i=0;i<data.items.length;i++) {
                    var item = data.items[i];
                    if (item.query != '*:*')
                        qs.push(item.query);
                }
                $scope.queries = qs;
                //console.log(q);

            });


    });