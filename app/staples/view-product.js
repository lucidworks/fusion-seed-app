/**
 * Created by evanpease on 2/17/15.
 */
'use strict';

angular.module('fusionSeed.viewstaplesProduct', ['ngRoute','solr.Directives', 'staples.Directives', 'fusion.Directives'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/staples/:store/p/:description?/:docId?', {
                templateUrl: 'staples/view-product.html',
                controller: 'ViewstaplesProductCtrl'
            });
    }])

    /*.controller('ViewstaplesSearchCtrl', [function() {

     }]);*/

    .controller('ViewstaplesProductCtrl', function ($scope, $http, $routeParams, $location, $route, $sce, fusionHttp, staplesSettings) {


        $scope.q = $routeParams.q;
        $scope.store = $routeParams.store;

        //queryPipeline(pipelineId,collectionId,reqHandlr,params)
        //product document
        fusionHttp.getQueryPipeline(
           staplesSettings.proxyUrl+staplesSettings.fusionUrl,
            'staples_poc1-default',
            'staples_poc1',
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
        fusionHttp.getItemsForItemRecommendations(staplesSettings.proxyUrl+staplesSettings.fusionUrl,staplesSettings.collectionId,$routeParams.docId,fqs)
            .success(function(data, status, headers, config) {
                //console.log(data);
                //$scope.recommendations = data.items;
                var q = "";
                for (var i=0;i<data.items.length;i++) {
                    var item = data.items[i];
                    q+= 'id:'+item.docId+'^'+item.weight + ' ';
                }
                fusionHttp.getQueryPipeline(staplesSettings.proxyUrl+staplesSettings.fusionUrl,"staples_poc1-select",staplesSettings.collectionId,"select",
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

        fusionHttp.getItemsForQueryRecommendations(staplesSettings.proxyUrl+staplesSettings.fusionUrl,staplesSettings.collectionId,$routeParams.q,fqs)
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
                fusionHttp.getQueryPipeline(staplesSettings.proxyUrl+staplesSettings.fusionUrl,"staples_poc1-select",staplesSettings.collectionId,"select",
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

        fusionHttp.getQueriesForItemRecommendations(staplesSettings.proxyUrl+staplesSettings.fusionUrl,staplesSettings.collectionId,$routeParams.docId,fqs)
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