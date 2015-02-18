/**
 * Created by evanpease on 2/17/15.
 */
var myModule = angular.module('fusionSeed.http', []);



myModule.factory('fusionHttp', ['$http', function($http) {
    // factory function body that constructs shinyNewServiceInstance

    var fusionHttp = {

        getCatCode: function(cat) {
            cat = cat.toLowerCase();
            cat = cat.replace(/~/g,'_');
            cat = cat.replace(/\|/g,'/');
            cat = cat.replace(/-/g,'_');
            console.log(cat);
            return cat;
        },

        getQueryPipeline: function(proxyBase,fusionUrl,pipelineId,collectionId,reqHandlr,params) {
            var url = proxyBase+fusionUrl+"/api/apollo/query-pipelines/"+pipelineId+"/collections/"+collectionId+"/"+reqHandlr;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');
            return $http(
                {method: 'GET',
                    url: url,
                    params: params
                });
            //.success(function(data, status, headers, config) {

        },
        postSignal: function(proxyBase,fusionUrl,collectionId,signalData) {

            var url = proxyBase+fusionUrl+'/api/apollo/signals/'+collectionId;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');
            return $http.post(url, signalData);
        },

        postRunAggr: function(proxyBase,fusionUrl,collectionId,jobId) {

            var url = proxyBase+fusionUrl+'/api/apollo/aggregator/jobs/'+collectionId+'_signals/'+jobId;

            console.log("Posting to " + url);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');
            return $http.post(url);
        },

        getItemsForItemRecommendations: function(proxyBase,fusionUrl,collectionId,docId,fq) {
            //http://ec2-54-90-6-131.compute-1.amazonaws.com:8764/api/apollo/recommend/wfm_poc1/itemsForItem?docId=54c0c901bcba6916008b50b0
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');
            var url = proxyBase+fusionUrl+"/api/apollo/recommend/"+collectionId+"/itemsForItem" //?docId="+docId+"&fq="+filterString;
            console.log("Getting itemsForItem recommendations from "+ url);
            return $http(
                {method: 'GET',
                    url: url,
                    params: {
                        docId: docId,
                        fq: fq
                    }
            });
        },

        getItemsForQueryRecommendations: function(proxyBase,fusionUrl,collectionId,q,fq) {
            //http://ec2-54-90-6-131.compute-1.amazonaws.com:8764/api/apollo/recommend/wfm_poc1/itemsForItem?docId=54c0c901bcba6916008b50b0
            if (!q) q='*:*';

            console.log("Getting item for Query Recommendations");

            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');
            var url = proxyBase+fusionUrl+"/api/apollo/recommend/"+collectionId+"/itemsForQuery"; //?q="+q+"&fq="+filterString;
            console.log('query for recommendations: ' + q);
            console.log('filters for recommendations:');
            console.log(fq);
            //return $http.get(url);
            return $http(
                {method: 'GET',
                    url: url,
                    params: {
                        q: q,
                        fq: fq
                    }
            });
        },
        getQueriesForItemRecommendations: function(proxyBase,fusionUrl,collectionId,docId,filterString) {
            //http://ec2-54-90-6-131.compute-1.amazonaws.com:8764/api/apollo/recommend/wfm_poc1/itemsForItem?docId=54c0c901bcba6916008b50b0
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');
            var url = proxyBase+fusionUrl+"/api/apollo/recommend/"+collectionId+"/queriesForItem?docId="+docId+"&fq="+filterString;
            console.log("Getting queriesForItem recommendations from "+ url);
            return $http.get(url);

        }


    };

    return fusionHttp;

}]);