#!/bin/sh


curl http://$1:8983/solr/demo_signals_aggr/update?stream.body=%3Cdelete%3E%3Cquery%3E*:*%3C/query%3E%3C/delete%3E
curl http://$1:8983/solr/demo_signals_aggr/update?stream.body=%3Ccommit/%3E

