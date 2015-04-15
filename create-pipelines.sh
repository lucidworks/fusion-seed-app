#!/bin/sh


curl -X POST -u admin:password123 -H 'Content-Type: application/json' -d '{
  "id" : "products-simple",
  "stages" : [ {
    "type" : "solr-query",
    "id" : "a1h2rzfr",
    "skip" : false,
    "label" : "solr-query",
    "type" : "solr-query"
  } ]
}' http://$1/api/apollo/query-pipelines

curl -X POST -u admin:password123 -H 'Content-Type: application/json' -d '{
  "id" : "products-default",
  "stages" : [ {
    "type" : "set-params",
    "id" : "fclq5mi",
    "params" : [ {
      "key" : "wt",
      "value" : "json",
      "policy" : "default"
    }, {
      "key" : "json.nl",
      "value" : "arrarr",
      "policy" : "default"
    } ],
    "skip" : false,
    "label" : "set-params",
    "type" : "set-params"
  }, {
    "type" : "search-fields",
    "id" : "941c10af-3cf4-469e-85a8-fce43fa9437d",
    "rows" : 10,
    "start" : 0,
    "queryFields" : [ {
      "field" : "CategoryPaths_t",
      "boost" : 1.0
    }, {
      "field" : "tags_t",
      "boost" : 2.0
    }, {
      "field" : "Name",
      "boost" : 3.0
    } ],
    "returnFields" : [ "* score" ],
    "minimumMatch" : "50%",
    "skip" : false,
    "label" : "search-fields",
    "type" : "search-fields"
  }, {
    "type" : "sub-query",
    "id" : "95vfs9k9",
    "key" : "subquery-results",
    "collection" : "products_signals_aggr",
    "handler" : "select",
    "method" : "GET",
    "parentParams" : [ "q" ],
    "params" : [ {
      "key" : "fl",
      "value" : "doc_id_s,weight_d"
    }, {
      "key" : "sort",
      "value" : "mul(field(weight_d),if(termfreq(type_s,click),1,if(termfreq(type_s,addToCart),2,1))) desc"
    }, {
      "key" : "defType",
      "value" : "edismax"
    }, {
      "key" : "qf",
      "value" : "query_t"
    }, {
      "key" : "rows",
      "value" : "100"
    }, {
      "key" : "pf",
      "value" : "query_t^3 query_t~2^7"
    }, {
      "key" : "mm",
      "value" : "50%"
    }, {
      "key" : "fl",
      "value" : "weight_final:mul(field(weight_d),if(termfreq(type_s,click),1,if(termfreq(type_s,addToCart),1.5,1)))"
    } ],
    "skip" : false,
    "label" : "sub-query",
    "type" : "sub-query"
  }, {
    "type" : "rollup-rec-aggr",
    "id" : "9zup7gb9",
    "key" : "subquery-results",
    "resultKey" : "aggr-results",
    "rollupField" : "doc_id_s",
    "weightField" : "weight_final",
    "weightFunction" : "sum",
    "maxRows" : 100,
    "sort" : true,
    "skip" : false,
    "label" : "rollup-rec-aggr",
    "type" : "rollup-rec-aggr"
  }, {
    "type" : "adv-boost",
    "id" : "dkt3ayvi",
    "boostingMethod" : "query-param",
    "boostingParam" : "bq",
    "key" : "aggr-results",
    "boostFieldName" : "id",
    "skip" : false,
    "label" : "adv-boost",
    "type" : "adv-boost"
  }, {
    "type" : "solr-query",
    "id" : "a900f123-e7a3-4dd1-bcdc-6a07c997bab8",
    "skip" : false,
    "label" : "solr-query",
    "type" : "solr-query"
  } ]
}' http://$1/api/apollo/query-pipelines 
