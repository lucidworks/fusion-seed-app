'use strict';

angular.module('fusionSeed.viewTwitterSearch', ['ngRoute','solr.Directives', 'twitter.Directives', 'fusion.Directives'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/twitter/:category?', {
                templateUrl: 'twitter/view-search.html',
                controller: 'ViewTwitterSearchCtrl',
                reloadOnSearch: true
            });
    }])

    .controller('ViewTwitterSearchCtrl', function ($scope, $http, $routeParams, $location, $route, $sce, $window, $interval, $timeout, fusionHttp, twitterService) {


        $scope.loading = true;

        $scope.controller_path = twitterService.controllerPath;

        $scope.noRecPipeline = twitterService.pipelineNoRecId;
        $scope.defaultPipeline = twitterService.pipelineId

        //pipeline_id and colleciton_id can be overriden by passing query params
        var pipeline_id = twitterService.pipelineId;
        var collection_id = twitterService.collectionId;

        //override default if passed to URL
        if ($routeParams.collection_id) collection_id = $routeParams.collection_id;
        if ($routeParams.pipeline_id) pipeline_id = $routeParams.pipeline_id;

        $scope.pipeline_id = pipeline_id;
        $scope.signalType = "click";


        if ($routeParams.searchWithin) $scope.searchWithin = $routeParams.searchWithin;

        var request_handler = twitterService.requestHandler;
        var url = twitterService.fusionUrl+'/api/apollo/query-pipelines/'+pipeline_id+'/collections/'+collection_id+'/'+request_handler;

        var collapse = undefined;
        if (twitterService.collapseField)
            collapse = "{!collapse field="+twitterService.collapseField+"}";


        $scope.clickCount = twitterService.defaultSignalCount;

        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $scope.isCatFilterOpen = false;
        $scope.isFacetFilterOpen = true;

        var q = '*:*';
        if ($routeParams.q) q = $routeParams.q;
        var mediaUrl = null;
        if ($routeParams.mediaUrl_ss){
            mediaUrl = $routeParams.mediaUrl_ss;
        }

        var category = '*';
        if ($routeParams.category) {
            category = twitterService.decodePath($routeParams.category);
            $scope.breadcrumb = category.split($scope.taxonomy_separator);
        }

        //use lucene term parser unless it is a * query
        if (twitterService.taxonomyField) {
            var cpath_fq;
            cpath_fq = "*:*"; //temp until we have a proper category facet
            if (category == '*')
                cpath_fq = cat_facet_field + ':' + category; //'cpath:'+category;
            else
                cpath_fq = '{!term f=' + cat_facet_field + '}' + category;
        }

        var filter = $routeParams.f;
        var fqs = twitterService.convertFqs(filter);


        /*var recFilter = "";
        //CUSTOM FOR ECOMM DEMO
        if ($routeParams.cat) {
            var cat = $routeParams.cat;
            //pass this to the UI to filter recommendations
            recFilter = cat.toLowerCase();
            if (cat.indexOf(twitterService.taxonomySeparator) > -1) {
                var department = cat.split(twitterService.taxonomySeparator)[0];
                var _class = cat.split(twitterService.taxonomySeparator)[1];
                fqs.push("{!term f=department}"+department);
                fqs.push("{!term f=class}"+_class);
            } else { fqs.push("{!term f=department}"+cat); };

        }
        //escape spaces for wild card string searches work
        recFilter = recFilter.replace(/ /g,"\\ ");
        recFilter += "*";
        // END CUSTOM*/


        //add searchWithin as a filter
        if ($scope.searchWithin) {
            fqs.push('{!edismax}' + $scope.searchWithin);
        };

        //ecomm only - filter on current store code or "ALL" for non products
        if ($routeParams.store)
            fqs.push("store_code_s:"+$routeParams.store+" OR store_code_s:ALL");

        //ecomm only - sale filter
        if ($routeParams.sale) {
            fqs.push("saleStart_tdt:[* TO NOW] AND saleEnd_tdt:[NOW TO *]");
        }

        //field collapsing
        if (collapse) {
            fqs.push(collapse);
        }

        //paging
        var start = 0;
        if ($routeParams.start) start = $routeParams.start;



        //send the search
        console.log("Send the search:" + mediaUrl);
        fusionHttp.getQueryPipeline(twitterService.fusionUrl,pipeline_id,collection_id,request_handler,
            {
                'q': q,
                'fq': fqs,
                'start': start,
                'mediaUrl_ss': mediaUrl
            })
            .success(function(data, status, headers, config) {

                //render the results
                renderSearchResults(data, status, headers, config);
                $scope.loading = false;

            }).error(function(data, status, headers, config) {
                console.log('Search failed!');
                console.log(headers);
                console.log(data);
                console.log(config);
            });

        function renderSearchResults(data, status, headers, config) {

            console.log(data);
            var fusionUrl = config.url+"?q="+q;
            for (var i=0;i<fqs.length;i++) fusionUrl+="&fq="+fqs[i];
            //if (recFilter) fusionUrl += "&recFilter="+recFilter;

            $scope.mediaUrl = mediaUrl;
            $scope.fusionUrl = fusionUrl;
            console.log("Render:");
            console.log(fusionUrl);

            $scope.data = data;
            $scope.showData = false;
            $scope.showDoc = false;

            var solr_params = data.responseHeader.params;


            //add the boosts for each item to the scope so they can be displayed
            $scope.recBoosts = twitterService.parseRecommendationBoost(solr_params.bq);


            var facet_fields = data.facet_counts.facet_fields;
            var facet_queries = data.facet_counts.facet_queries;
            var taxonomy = facet_fields[twitterService.taxonomyField];


            $scope.solr_params = solr_params;
            $scope.showParams = false;

            $scope.facet_fields = facet_fields;
            if (twitterService.taxonomyPivot) {
                $scope.taxonomy_pivot = data.facet_counts.facet_pivot[twitterService.taxonomyPivot];
            }

            $scope.facet_queries = facet_queries;
            $scope.taxonomy = taxonomy;

            var docs = data.response.docs;
            $scope.docs = docs;

            //how many docs are there?
            var docCount = docs.length;

            //paging
            var pageSize = solr_params.rows;
            //how many pages are there?
            $scope.numPages = twitterService.calculateNumPages(data.response.numFound,pageSize);
            //what page are we on?
            $scope.currentPage = (start / pageSize) + 1;
            $scope.pageSize = pageSize;
            $scope.start = start;

            if ($scope.numPages > 10) {
                $scope.showPages = new Array(10);
            } else $scope.showPages = new Array($scope.numPages);



            //console.log("Doc count:"+ docCount);
            if (docCount == 0) {
                /*fusionHttp.getSpellCheck(twitterService.fusionUrl,"ecomm_poc1-spellcheck",collection_id,q)
                    .success(function(data2) {
                        console.log(data2);
                        if (data2.spellcheck.suggestions.collation) {
                            $scope.spellsuggest = data2.spellcheck.suggestions.collation
                        } else {
                            $scope.spellsuggest = data2.spellcheck.suggestions
                        }
                        //console.log($scope.spellsuggest);
                    });*/
            } else {

                //TODO implement top or related searches here
            }
        }

        $scope.doSearchWithin = function(text) {
            $location.search('searchWithin', text);
        }

        $scope.clickSearch = function(query) {
            $location.search('q', query);
        }

        //Signals API
        //curl -u admin:password123 -X POST -H 'Content-type:application/json' -d '[{"params": {"query": "sushi", "docId": "54c0a3bafdb9b911008b4b2a"}, "type":"click", "timestamp": "2015-02-12T23:44:52.533000Z"}]' http://ec2-54-90-6-131.compute-1.amazonaws.com:8764/api/apollo/signals/ecomm_poc1
        $scope.sendSignal = function(signalType,docId,count,department,_class,manufacturer) {


            var filters = $routeParams.f;

            var filterHash = twitterService.getFilterHash(filters);
            console.log(filterHash);


            //return twitterService.sendSignal(signalType,docId,count,$routeParams.q,filterHash.department,filterHash.class,filterHash.manufacturer)
            return twitterService.sendSignal(signalType,docId,count,$routeParams.q,department,_class,manufacturer)
                .success(function(response) {
                console.log(response);
                var msg = 'Successfully indexed signals for docid: ' + docId;
                console.log(msg)
                $scope.notification = true;
                $scope.notificationMsg = msg;
            });
        }

        $scope.urlSafe = function(text) {
            return twitterService.urlSafe(text);
        }




        //Aggregation Job Progress Bar
        $scope.aggrFinished = true;

        $scope.waitThenRunAggregations = function () {

            $scope.totalAggrSecs = 0;
            $scope.aggrProgress = 0;
            $scope.aggrProgressText = "";
            $scope.jobStates = [];

            $scope.aggrFinished = false;
            //set an interval for every second
            $interval($scope.updateAggrProgress, 1000);

        };

        $scope.updateAggrProgress = function() {
            $scope.totalAggrSecs++;

            //Wait 3 seconds before starting to make sure any simulated signals
            //are committed to the index.
            if ($scope.totalAggrSecs < 3) {
                $scope.aggrProgress = $scope.totalAggrSecs;
            }

            //Start aggregation jobs at 3 seconds
            if ($scope.totalAggrSecs == 3) {
                $scope.aggrProgressText = "Starting jobs...";
                $scope.runAggregations();
            }

            //Update status at 4 seconds
            if ($scope.totalAggrSecs == 4) {
                $scope.aggrProgress = $scope.totalAggrSecs;
                $scope.aggrProgressText = "Monitoring job status..."
            }

            //After for seconds, check the job status with each interval
            if ($scope.totalAggrSecs > 4) {
                for (var i=0;i<twitterService.aggrJobs.length;i++) {
                    var jobDone = false;
                    var url = twitterService.fusionUrl+"/api/apollo/aggregator/jobs/products_signals/"+twitterService.aggrJobs[i];
                    $http(
                        {method: 'GET',
                            url: url
                        })
                        .success(function(response) {
                            //console.log(response.aggregation.id+ ":" + response.state);
                            $scope.jobStates[i] = response.state;
                        }
                    );

                }
                //each job needs to be state="finished"
                var aggrFinished = true;
                //no job states so we can't be finished.
                if ($scope.jobStates == 0) {
                    aggrFinished = false;
                }
                for (var i=0;i<$scope.jobStates;i++) {
                    if ($scope.jobStates[i] != "finished") {
                        aggrFinished = false;
                    }
                }
                if (aggrFinished) {
                    $scope.aggrProgressText = "Finished!";
                    $scope.aggrProgress = 5;
                }
                //If we reach 8 seconds and the jobs are done, hide the progress bar.
                if ($scope.totalAggrSecs > 8 && $scope.aggrProgress == 5) {
                    $scope.aggrFinished = true;
                }

            }

        }
        //End aggregation progress bar

        //http://ec2-54-90-6-131.compute-1.amazonaws.com:8764/api/apollo/aggregator/jobs/ecomm_poc1_signals/ecommClickAggr
        $scope.runAggregations = function() {

            var msg = "";
            for (var i=0;i<twitterService.aggrJobs.length;i++) {
                fusionHttp.postRunAggr(twitterService.fusionUrl,collection_id,twitterService.aggrJobs[i])
                    .success(function(response) {
                        msg = 'Started aggregation job.';
                        $scope.aggrProgressText = "Started aggregation jobs."
                    });
            };
            return;

        };

        //an alternate type ahead using the search history collection and the suggester component
        $scope.typeAheadSearch = function(val) {
            return twitterService.typeAheadSearch(val);
        };

        $scope.clickSaleFilter = function() {

            if ($location.search()['sale'] == 'true') {
                //already filtered, un-filter
                var search = $location.search();
                delete search['sale'];
                $location.search(search);

            } else {
                $location.search('sale', 'true');
            }

        }

        $scope.isSalesFilterChecked = function () {
            if ($location.search()['sale'] == 'true') {
                return true;
            }
        }


        $scope.createCatLink = function(cat) {
            var q = "";
            if ($routeParams.q) q = $routeParams.q;
            return "#/"+twitterService.controllerPath+"/"+encodePath(cat)+"?q="+q;
        }


        $scope.renderSearchResultsBullets = function(data) {
            return twitterService.renderSearchResultsBullets(data);
        }

        $scope.submitSearch = function(query, media, controller_path){
            console.log(query);
            console.log(media);
            var search = $location.search(); 
            search['q'] = query; 
            search['mediaUrl_ss'] = media; 
            search['f'] = '';
            $location.search(search)
        }

        $scope.clickPivot = function(department,_class) {
            var search = $location.search();
            var cat;
            if (department) cat = department;
            if (_class) cat += twitterService.taxonomySeparator + _class;

            //cat = cat.replace(/ /g,"+");

            //delete searc['start'];

            search['cat'] = cat;
            search['start'] = 0;
            $location.search(search);
        }

        $scope.clickFacet = function(fname, fvalue) {

            var search = $location.search();

            //was the filter already clicked on?
            var filters = search['f'];
            var already_clicked = false;
            if (filters) {
                if (Array.isArray(filters)) {
                    for (var i=0;i<filters.length;i++) {
                        if (filters[i] == fname+":"+fvalue) {
                            already_clicked = true;
                            filters.splice(i,1);
                            search['f'] = filters;
                        }
                    }
                } else {
                    if (filters == fname+":"+fvalue) {
                        already_clicked = true;
                        delete search['f'];
                    }
                }
            }
            if (already_clicked == false) {
                var f = []; //array of filters
                if (search['f']) {
                    //if there is already multiple "f"s then it is already array
                    if (Array.isArray(search['f'])) f = search['f']
                    //if there is a single value (not an array), add it to our array
                    else f.push(search['f']);
                }
                //add the new filter to our array
                f.push(fname + ":" + fvalue);
                //add our new array of filters to the search object
                search['f'] = f;
            }

            search['start'] = 0

            $location.search(search);
        }

        $scope.isSelected = function(fname, fvalue) {
            var search = $location.search();
            if (search.f) {
                if (search.f.indexOf(fname+':'+fvalue) > -1) return true;
                else return false;
            }
            return false;
        }

        $scope.renderHtml = function(html_code) {
            return twitterService.renderHtml(html_code);
        };

        function encodePath(path) {
            return twitterService.encodePath(path);
        };


    });
