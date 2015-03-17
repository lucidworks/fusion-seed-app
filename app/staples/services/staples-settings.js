var myModule = angular.module('fusionSeed.staplesSettings', []);

myModule.factory('staplesSettings', ['$http', function($http) {

    $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');

    var staplesSettings = {
        "proxyUrl": "http://localhost:9292/",
        "fusionUrl": "162.242.133.12:8764",
        "pipelineId": "staples1-default",
        "collectionId": "staples1",
        "requestHandler": "select",
        "taxonomyField": "DEPARTMENT_NAME_s",
        "taxonomySeparator": "|",
        "filterSeparator": "~",
        "controllerPath": "staples",
        "multiSelectFacets": false,
        "collapseField": undefined,
        "aggrJobId": "staplesClickAggr"
    };

    return staplesSettings;

}]);