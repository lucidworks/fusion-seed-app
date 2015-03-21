/**
 * Created by evanpease on 2/17/15.
 */
'use strict';

angular.module('fusionSeed.viewstaplesProduct', ['ngRoute','solr.Directives', 'staples.Directives', 'fusion.Directives'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/staples/p/:description?/:docId?', {
                templateUrl: 'staples/view-product.html',
                controller: 'ViewstaplesProductCtrl'
            });
    }])

    /*.controller('ViewstaplesSearchCtrl', [function() {

     }]);*/

    .controller('ViewstaplesProductCtrl', function ($scope, $http, $routeParams, $location, $route, $sce, fusionHttp, staplesSettings) {


        $scope.q = $routeParams.q;

        //queryPipeline(pipelineId,collectionId,reqHandlr,params)
        //product document
        fusionHttp.getQueryPipeline(
           staplesSettings.fusionUrl,
            'staples1-simple',
            'staples1',
            'select',
                {
                    q: 'id:'+$routeParams.docId,
                    'json.nl': 'arrarr',
                    'wt': 'json'
                })
            .success(function(data, status, headers, config) {
                $scope.product = data.response.docs[0];

            });


        //item counts
        /*http://162.242.133.12:8983/solr/staples1_signals/select
        ?wt=json
        &rows=0
        &indent=true
        &facet=true
        &facet.field=query_s
        &stats=true
        &stats.field=count_i
        &q=doc_id_s:f84781bf31cb43549abdac9e3125ecc8
        &stats.facet=type_s
         */
        fusionHttp.getQueryPipeline(staplesSettings.fusionUrl,"staples1-simple","staples1_signals","select",
            {
                q: "doc_id_s:"+$routeParams.docId,
                'wt': 'json',
                'rows': 0,
                'facet': true,
                'facet.field': ["query_s","query_t"],
                'facet.limit': 10,
                'stats': true,
                'stats.field': "count_i",
                'stats.facet': "type_s",
                'facet.mincount': 1,
                'json.nl':"arrarr"
            }).success(function(data) {

                //console.log(data.stats);
                $scope.itemStats = data;
        });

        //recommendations
        //limit recommendations to the current store
        var fqs = [];
        fusionHttp.getItemsForItemRecommendations(staplesSettings.fusionUrl,staplesSettings.collectionId,$routeParams.docId,fqs)
            .success(function(data, status, headers, config) {
                //console.log(data);
                //$scope.recommendations = data.items;
                var q = "";
                for (var i=0;i<data.items.length;i++) {
                    var item = data.items[i];
                    q+= 'id:'+item.docId+'^'+item.weight + ' ';
                }
                fusionHttp.getQueryPipeline(staplesSettings.fusionUrl,"staples1-simple",staplesSettings.collectionId,"select",
                    {
                        q: q,
                        wt: 'json',
                        fl: 'id,PRODUCTNAME_t,attr_IMAGE_TYPE_URL_6_,attr_FILENAME_6_,score',
                        rows: '5'
                    }).success(function(data) {
                       $scope.recommendations = data.response.docs;
                        //console.log($scope.recommendations);
                    });

                //console.log(q);

        });

        fusionHttp.getItemsForQueryRecommendations(staplesSettings.fusionUrl,staplesSettings.collectionId,$routeParams.q,fqs)
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
                fusionHttp.getQueryPipeline(staplesSettings.fusionUrl,"staples1-simple",staplesSettings.collectionId,"select",
                    {
                        q: q,
                        wt: 'json',
                        fl: 'id,PRODUCTNAME_t,attr_IMAGE_TYPE_URL_6_,attr_FILENAME_6_,score',
                        rows: '5'
                    }).success(function(data) {
                        $scope.recommendations2 = data.response.docs;
                    });

                //console.log(q);

            });

        fusionHttp.getQueriesForItemRecommendations(staplesSettings.fusionUrl,staplesSettings.collectionId,$routeParams.docId,fqs)
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