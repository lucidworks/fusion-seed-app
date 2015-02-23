var myModule = angular.module('fusionSeed.wfmSettings', []);

myModule.factory('wfmSettings', [function() {
    var wfmSettings = {
        "proxyUrl": "http://localhost:9292/",
        "fusionUrl": "ec2-54-90-6-131.compute-1.amazonaws.com:8764",
        "pipelineId": "wfm_poc1-default",
        "collectionId": "wfm_poc1",
        "requestHandler": "select",
        "taxonomyField": "cat_tree",
        "taxonomySeparator": "|",
        "filterSeparator": "~",
        "controllerPath": "wfm",
        "multiSelectFacets": false,
        "collapseField": "attr_identifier_",
        "aggrJobId": "wfmClickAggr"
    };

    return wfmSettings;

}]);