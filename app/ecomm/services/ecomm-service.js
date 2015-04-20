var myModule = angular.module('fusionSeed.ecommService', []);

myModule.factory('ecommService', ['$http', 'fusionHttp', '$sce', function($http,fusionHttp,$sce) {

    //$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');

    var ecommService = {
        "fusionUrl": "http://ec2-54-89-123-52.compute-1.amazonaws.com:9292",
        "pipelineId": "products-default",
        "simplePipelineId": "products-simple",
        "collectionId": "products",
        "signalsCollectionId": "products_signals",
        "typeAheadCollectionId": "products_signals_aggr",
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
        },

        decodePath:  function(path) {
            return path.
                replace(/~/g, '/').
                replace(/-/g, ' ');
        },

        sendSignal: function(signalType,docId,count,q) {

            //console.log(signalType);
            //return;

            var filters = [];
            //filters.push("store/" + $routeParams.store);
            //if ($routeParams.category && $routeParams.category != '*')
            //    filters.push("department/" + fusionHttp.getCatCode($routeParams.category));

            var d = new Date();
            var ts = d.toISOString();


            var data = []
            for (var i= 0;i<count;i++) {
                var signal = {"params": {"query": q, filterQueries: filters, "docId": docId}, "type":signalType, "timestamp": ts};
                //console.log(solrParams.q);
                //console.log(solrParams.fq);
                console.log(signal);
                data.push(signal);
            }
            /*return $http.post(url, data)
             .success(function(response) {
             console.log(response);
             var msg = 'Successfully indexed signals for docid: ' + docId;
             console.log(msg)
             $scope.notification = true;
             $scope.notificationMsg = msg;
             });*/
            return fusionHttp.postSignal(this.fusionUrl,this.collectionId,data);
        },

        renderHtml: function(html_code)
        {
            return $sce.trustAsHtml(html_code);
        },

        encodePath: function(path) {
            return path.
                replace(/\//g, '~').
                replace(/ /g, '-');
        },

        renderSearchResultsBullets: function(data) {
            if (!data) return '';

            var html = '<ul>';
            for (var i=0;i<data.length;i++) {
                html += '<li>' + data[i] + '</li>';
                if (i == 2) break;
            }
            html += '</ul>';
            return $sce.trustAsHtml(html);
        },

        convertFqs: function (filter) {
            var fqs = [];
            //if (filter) fqs = filter.split(filter_separator);
            if (filter) fqs = filter //$routeParams.f;
            //TODO add multi select facet support back in
            //if we're using multi_select_facets, change the syntax of the fqs
            if (ecommService.multiSelectFacets) {
                var new_fqs = [];
                for (var i=0;i<fqs.length;i++) {
                    //console.logs('old fq:' + fqs[i]);
                    //&fq={!tag=colortag}color:red
                    var fname = fqs[i].split(':')[0];
                    var new_fq = '{!tag='+fname+'_tag}'+fqs[i];
                    //console.logs('new fq:' + new_fq);
                    new_fqs.push(new_fq);
                }
                fqs = new_fqs;
            }
            //convert all fqs to {!term} qparser syntax
            var new_fqs = []
            //add category as a filter
            if (ecommService.taxonomyField) new_fqs.push(cpath_fq);
            if (Array.isArray(fqs)) {
                for (var i = 0; i < fqs.length; i++) {
                    var kv = fqs[i].split(':');
                    var fname = kv[0];
                    var fvalue = kv[1];
                    new_fq = '{!term f=' + fname + '}' + fvalue;
                    new_fqs.push(new_fq);
                }
            } else {
                var kv = fqs.split(':');
                var fname = kv[0];
                var fvalue = kv[1];
                new_fq = '{!term f=' + fname + '}' + fvalue;
                new_fqs.push(new_fq);
            }
            fqs = new_fqs;
            return fqs;
        }

    };

    return ecommService;

}]);