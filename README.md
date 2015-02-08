

The idea of this repository is to provide a "barebones" or blank "canvas" UI for PoCs where the built-in Fusion Search UI is not enough (or too much). It can also be used as a tool to demonstrate how to integrate Solr/Fusion with client-side UIs.

## Installation Requirements
* Node
* Fusion

## Sample Setup
1. Create a collection called "products". Add the contents of "1-schema-add.txt" to the example schema and reload the core.
2. Index the sample documents from "2-sample-documents.xml". They're in SolrXml format. Perhaps the quickest way to index them is to go to http://localhost:8983/solr/#/products_shard1_replica1/documents, select "XML", paste the sample documents, and click "Submit Document".
3. Run 3-create-pipeline.sh 

## UI Installation
After cloning this repository:

~~~
cd fusion-seed-ui
bin/start
~~~
This script will ensure all dependencies are installed. Then start an HTTP server on http://localhost:8000 and a CORS-enabled proxy server on http://localhost:9292. To change the hostname and ports, modify bin/start.

* Go to http://localhost:8000/app/#/search/*
* To see an example of the Query Pipeline adding facets based on the category, click on Men's -> Blazers (or go to http://localhost:8000/app/#/search/Men~Blazers?q=)

## Customizing The View and Controller
The most important pieces of code are the View and the Controller found in app/view-search. 

view-search.js begins by setting some defaults of interest if customizing:

~~~javascript
'use strict';

angular.module('fusionSeed.viewSearch', ['ngRoute','solr.Directives'])

.constant("SEARCH_DEFAULTS", {
	"proxy_url": "http://localhost:9292/",
	"fusion_url": "localhost:8764",
	"pipeline_id": "products-demo",
	"collection_id": "products",
	"request_handler": "select",
	"taxonomy_field": "cpath",
	"filter_separator": "~",
	"controller_path": "search",
	"multi_select_facets": false,
	"collapse_field": "name_exact_s"
})
~~~

view-search.html handles the rendering

~~~html
			Found {{data.response.numFound}} results.

			<div ng-repeat="doc in docs">
				<div>
					<h3>{{doc.name}}</h3> <br/>
					{{doc.short_description}} <br/>
					<strong>${{doc.price}}</strong>

				</div>
			</div>
~~~

## Features
* Auto-renders facet fields.
* Supports hierchichal facet / taxonomy navigation.
* Url Rewrite (taxonomy in URL for SEO)

## Roadmap
* Auto-complete
* Spell-checking
* Multi-select faceting
* Signal API integration and demonstration
* Recommendations



