var myModule = angular.module('fusionSeed.ecommService', []);

myModule.factory('ecommService', ['$http', 'fusionHttp', '$sce', function($http,fusionHttp,$sce) {

    //$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('admin:password123');

    var ecommService = {
        "fusionUrl": "http://192.168.1.243:9292", //The url where Fusion is hosted.
        "pipelineId": "demo-default", //the main pipeline that searches will go through
        "pipelineNoRecId": "demo-default_copy", //the pipeline ID that searchs w/o recommendations should go through
        "simplePipelineId": "demo-simple", // a 1 stage "Query Solr" pipeline with /select and /suggest enabled.
        "collectionId": "demo", //the main collection
        "signalsCollectionId": "demo_signals", //the signals colleciton
        "typeAheadCollectionId": "demo_signals_aggr", //the collection where suggestions should come from
        "typeAheadDictionary": "mySuggester",
        "typeAheadReqHandler": "suggest",
        "requestHandler": "select", //default request handler for searches
        "taxonomyField": undefined, //set to undefined if using pivot facet for taxonomy
        "taxonomySeparator": "|", //if using a path hierarchy field
        "taxonomyPivot":"department,class", //set to undefined if using PathHierarchyTokenizer field for taxonomy
        "filterSeparator": "~",
        "controllerPath": "ecomm",
        "aggrJobs": ["clickAggr","cartAggr"], //aggregation jobs that should run when a user clicks "run aggregations" button.
        "defaultSignalCount": 1, //default signal count to be displayed in the UI simulation
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

        getFilterHash: function(filters) {
            var fs = {};
            if (Array.isArray(filters)) {
                for (var i=0;i<filters.length;i++) {
                    if (filters[i].indexOf(":") > -1) {
                        var fKV = filters[i].split(":");
                        fs[fKV[0]] = fKV[1];
                    }
                }
            } else if (typeof(filters) == "string") {
                var fKV = filters.split(":");
                fs[fKV[0]] = fKV[1];
            }
            return fs;
        },

        sendSignal: function(signalType,docId,count,q,department,_class,manufacturer) {

            var params = {};
            params["query"] = q;
            params["docId"] = docId;
            if (department) params["department"] = department;
            if (_class) params["class"] = _class;
            if (manufacturer) params["manufacturer"] = manufacturer;

            var d = new Date();
            var ts = d.toISOString();

            var data = []
            for (var i= 0;i<count;i++) {
                //var signal = {"params": {"query": q, filterQueries: undefined, "docId": docId}, "type":signalType, "timestamp": ts};
                var signal = {"params": params, "type":signalType, "timestamp": ts};
                //console.log(solrParams.q);
                //console.log(solrParams.fq);
                //console.log(signal);
                data.push(signal);
            }
            return fusionHttp.postSignal(this.fusionUrl,this.collectionId,data,true);
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
        },

        typeAheadSearch: function(val) {
            return fusionHttp.getQueryPipeline(ecommService.fusionUrl,ecommService.simplePipelineId,ecommService.typeAheadCollectionId,this.typeAheadReqHandler,
                {
                    wt: 'json',
                    "suggest.dictionary": this.typeAheadDictionary,
                    q: val

                }).then(function (response) {
                    var dict = response.config.params["suggest.dictionary"];
                    var d = response.data.suggest[dict][val].suggestions
                    //console.log(d);
                    var ta = [];
                    for (var i = 0; i < d.length; i++) {
                        //console.log("pushing:");
                        //console.log(d[i].term);
                        ta.push(d[i].term);
                    }
                    return ta;
                })

        },

        /*rebuildSuggest: function() {
            return fusionHttp.getQueryPipeline(ecommService.fusionUrl,ecommService.simplePipelineId,ecommService.typeAheadCollectionId,this.typeAheadReqHandler,
                {
                    wt: 'json',
                    "suggest.dictionary": this.typeAheadDictionary,
                    "suggest.build": "true",
                    q: "a"

                });
        },*/

        calculateNumPages: function(numDocs,pageSize) {
            return Math.ceil(numDocs / pageSize);
        },

        //returns a hash of kvs (id,boost) from Solr's bq param
        parseRecommendationBoost: function(bq) {
            if (bq) {
                var recBoost = {};
                if (Array.isArray(bq)) {
                    for (var i = 0; i < bq.length; i++) {
                        var id = bq[i].split("^")[0].replace("id:", "");
                        var boost = bq[i].split("^")[1];
                        recBoost[id] = boost;
                    }

                } else {
                    var id = bq.split("^")[0].replace("id:", "");
                    var boost = bq.split("^")[1];
                    recBoost[id] = boost;
                }
                return recBoost;
            } else return undefined;
        }


    };

    return ecommService;

}]);
