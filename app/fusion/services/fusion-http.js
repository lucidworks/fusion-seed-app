/**
 * Created by evanpease on 2/17/15.
 */
var myModule = angular.module('fusionSeed.http', []);


myModule.constant("DEFAULTS", {
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
});

myModule.factory('fusionHttp', ['$http', function($http) {
    // factory function body that constructs shinyNewServiceInstance

    var fusionHttp = {
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
        }


    };

    return fusionHttp;

}]);