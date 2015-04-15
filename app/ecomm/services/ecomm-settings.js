var myModule = angular.module('fusionSeed.ecommSettings', []);

myModule.factory('ecommSettings', ['$http', function($http) {

    //$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');

    var ecommSettings = {
        "fusionUrl": "http://ec2-54-89-123-52.compute-1.amazonaws.com:9292",
        "pipelineId": "products-default",
        "simplePipelineId": "products-simple",
        "collectionId": "products",
        "typeAheadCollectionId": "products_suggest",
        "requestHandler": "select",
        "taxonomyField": undefined,
        "taxonomySeparator": "/",
        "taxonomyPivot":"department,class",
        "filterSeparator": "~",
        "controllerPath": "ecomm",
        "multiSelectFacets": false, //not currently supported
        "collapseField": undefined
    };

    return ecommSettings;

}]);