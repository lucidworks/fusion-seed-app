/**
 * Created by evanpease on 2/17/15.
 */
'use strict';

angular.module('fusionSeed.viewWfmProduct', ['ngRoute','solr.Directives', 'wfm.Directives', 'fusion.Directives'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/wfm/:store/p/:description?/:docId?', {
                templateUrl: 'wfm/view-product.html',
                controller: 'ViewWfmProductCtrl'
            });
    }])

    /*.controller('ViewWfmSearchCtrl', [function() {

     }]);*/

    .controller('ViewWfmProductCtrl', function ($scope, $http, $routeParams, $location, $route, $sce, fusionHttp, wfmSettings) {


        $scope.q = $routeParams.q;
        $scope.store = $routeParams.store;

        //queryPipeline(pipelineId,collectionId,reqHandlr,params)
        //product document
        fusionHttp.getQueryPipeline(
           wfmSettings.proxyUrl+wfmSettings.fusionUrl,
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
        fusionHttp.getItemsForItemRecommendations(wfmSettings.proxyUrl+wfmSettings.fusionUrl,wfmSettings.collectionId,$routeParams.docId,fqs)
            .success(function(data, status, headers, config) {
                //console.log(data);
                //$scope.recommendations = data.items;
                var q = "";
                for (var i=0;i<data.items.length;i++) {
                    var item = data.items[i];
                    q+= 'id:'+item.docId+'^'+item.weight + ' ';
                }
                fusionHttp.getQueryPipeline(wfmSettings.proxyUrl+wfmSettings.fusionUrl,"wfm_poc1-select",wfmSettings.collectionId,"select",
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

        fusionHttp.getItemsForQueryRecommendations(wfmSettings.proxyUrl+wfmSettings.fusionUrl,wfmSettings.collectionId,$routeParams.q,fqs)
            .success(function(data, status, headers, config) {
                //console.log(data);
                //$scope.recommendations = data.items;
                var q = "";
                //console.log(data);
                for (var i=0;i<data.items.length;i++) {
                    var item = data.items[i];
                    q+= 'id:'+item.docId+'^'+item.weight + ' ';
                }
                //console.log("WAHT IS Q:" + q);
                fusionHttp.getQueryPipeline(wfmSettings.proxyUrl+wfmSettings.fusionUrl,"wfm_poc1-select",wfmSettings.collectionId,"select",
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

        fusionHttp.getQueriesForItemRecommendations(wfmSettings.proxyUrl+wfmSettings.fusionUrl,wfmSettings.collectionId,$routeParams.docId,fqs)
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