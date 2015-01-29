

The idea of this repository is to provide a "barebones" or blank "canvas" UI for PoCs where the built-in Fusion UI is not enough (or too much). It can also be used as a tool to demonstrate how to integrate Solr/Fusion with client-side UIs.

## Installation Requirements
* Node
* Fusion

## Sample Setup
1. Create a collection called "products". Add the contents of "1-schema-add.txt" to the example schema and reload the core.
2. Add the sample documents from "2-sample-documents.xml". They're in SolrXml format. Perhaps the quickest way to load them is to go to http://localhost:8983/solr/#/products_shard1_replica1/documents, select "XML", paste the sample documents, and click "Submit Document".
3. Run 3-create-pipeline.sh 

## UI Installation
1. After cloning this repository:
~~~
cd fusion-seed-ui
npm install
npm install corsproxy
npm start
~~~
This will start an HTTP server on http://localhost:8000

2. Open a new terminal window and start the CORS proxy:
~~~  
corsproxy
~~~
A proxy server is required because CORS is not enabled in Fusion by default. CORS is required in order to be able to do cross-domain scripting from a browser. You could work around this by using JSONP which Solr supports but, JSONP does not work with Basic Auth which Fusion requires.



This code is based off of the angular seed app.
https://github.com/angular/angular-seed
