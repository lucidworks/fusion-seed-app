curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{
  "id" : "products-demo",
  "stages" : [ {
    "type" : "javascript-query",
    "id" : "ik9pmn29",
    "script" : "//facet the taxonomy for every product search\nrequest.addParam(\"facet\",\"true\");\nrequest.addParam(\"facet.field\",\"cpath\");\nrequest.addParam(\"facet.mincount\",1);\nrequest.addParam(\"facet.sort\",\"count\");\nrequest.addParam(\"f.cpath.facet.sort\",\"index\");\n\n//rules for Men/Blazers\nif (request.getParam(\"fq\").contains(\"{!term f=cpath}Men/Blazers\")) {\n\t//facets for Blazers\n\trequest.addParam(\"facet.field\",\"apparel_type_ss\");\n\trequest.addParam(\"apparel_type_ss.label\", \"Apparel Type\");\n\trequest.addParam(\"facet.field\",\"color_ss\");\n\t\trequest.addParam(\"color_ss.label\", \"Color\");\n\t\n\trequest.addParam(\"facet.field\",\"fit_ss\");\n\trequest.addParam(\"fit_ss.label\",\"Fit\");\n\t//request.addParam(\"facet.field\",\"gender_ss\");\n\trequest.addParam(\"facet.field\",\"occasion_ss\");\n\trequest.addParam(\"facet.field\",\"size_ss\");\n\trequest.addParam(\"facet.field\",\"sleeve_length_ss\");\n}",
    "skip" : false,
    "label" : "javascript-query",
    "type" : "javascript-query"
  }, {
    "type" : "solr-query",
    "id" : "48f1ccf9-54a6-49e4-986f-e8c729221800",
    "skip" : false,
    "label" : "solr-query",
    "type" : "solr-query"
  } ]
}' http://localhost:8764/api/apollo/query-pipelines
