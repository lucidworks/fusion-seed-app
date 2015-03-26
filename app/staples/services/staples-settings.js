var myModule = angular.module('fusionSeed.staplesSettings', []);

myModule.factory('staplesSettings', ['$http', function($http) {

    //$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');

    var staplesSettings = {
        //"proxyUrl": "http://localhost:9292/",
        //"fusionUrl": "162.242.133.12:8764",
        "fusionUrl": "http://162.242.133.12:9292",
        "pipelineId": "staples1-default",
        "simplePipelineId": "staples1-simple",
        "collectionId": "staples1",
        "typeAheadCollectionId": "staples1_suggest",
        "requestHandler": "select",
        "taxonomyField": "cat_tree",
        "taxonomySeparator": "/",
        "filterSeparator": "~",
        "controllerPath": "staples",
        "multiSelectFacets": false,
        "collapseField": undefined, //defined in pipeline
        "aggrJobId": "clickAggr"
    };

    return staplesSettings;

}]);