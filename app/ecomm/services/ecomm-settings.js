var myModule = angular.module('fusionSeed.ecommSettings', []);

myModule.factory('ecommSettings', ['$http', function($http) {

    //$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');

    var ecommSettings = {
        "fusionUrl": "http://ec2-54-89-123-52.compute-1.amazonaws.com:9292",
        "pipelineId": "products-default",
        "simplePipelineId": "products-simple",
        "collectionId": "products",
        "signalsCollectionId": "products_signals",
        "typeAheadCollectionId": "products_suggest",
        "requestHandler": "select",
        "taxonomyField": undefined, //set to undefined if using pivot facet for taxonomy
        "taxonomySeparator": "/",
        "taxonomyPivot":"department,class", //set to undefined if using PathHierarchyTokenizer field for taxonomy
        "filterSeparator": "~",
        "controllerPath": "ecomm",
        "aggrJobs": ["clickAggr","cartAggr"],
        "defaultSignalCount": 1, //default signal count to be displayed in the UI
        "multiSelectFacets": false, //not currently supported
        "collapseField": undefined,


        urlSafe: function(text) {
            if (text) {
                text = text.toLowerCase();
                text = text.replace(/ /g, "-");
                text = text.replace(/&/g, 'and');
                text = text.replace(/\//g, ' ');
                text = text.replace(/\./g, '-');
            }
            return text;
        }

    };


    return ecommSettings;

}]);