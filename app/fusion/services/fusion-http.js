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

        getQueryPipeline: function(fusionUrl,pipelineId,collectionId,reqHandlr,params) {
            var url = fusionUrl+"/api/apollo/query-pipelines/"+pipelineId+"/collections/"+collectionId+"/"+reqHandlr;
            return $http(
                {method: 'GET',
                    url: url,
                    params: params
                });
            //.success(function(data, status, headers, config) {

        },
        postSignal: function(fusionUrl,collectionId,signalData,commit) {
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');
            var url = fusionUrl+'/api/apollo/signals/'+collectionId;
            if (commit) url+= "?commit=true";
            return $http.post(url, signalData);
        },

        postRunAggr: function(fusionUrl,collectionId,jobId) {

            var url = fusionUrl+'/api/apollo/aggregator/jobs/'+collectionId+'_signals/'+jobId;

            console.log("Posting to " + url);
            return $http.post(url);
        },


        getSpellCheck: function(fusionUrl,pipelineId,collectionId,q) {
            return fusionHttp.getQueryPipeline(fusionUrl,pipelineId,collectionId,"spellcheck",{q:q});
        },

        getItemsForItemRecommendations: function(fusionUrl,collectionId,docId,fq) {
            var url = fusionUrl+"/api/apollo/recommend/"+collectionId+"/itemsForItem" //?docId="+docId+"&fq="+filterString;
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

        getItemsForQueryRecommendations: function(fusionUrl,collectionId,q,fq) {
            if (!q) q='*:*';

            var url = fusionUrl+"/api/apollo/recommend/"+collectionId+"/itemsForQuery"; //?q="+q+"&fq="+filterString;
            console.log('Query for recommendations: ' + q);
            console.log('Filters for recommendations:');
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
        getQueriesForItemRecommendations: function(fusionUrl,collectionId,docId,filterString) {
            var url = fusionUrl+"/api/apollo/recommend/"+collectionId+"/queriesForItem?docId="+docId+"&fq="+filterString;
            console.log("Getting queriesForItem recommendations from "+ url);
            return $http.get(url);

        }


    };

    return fusionHttp;

}]);