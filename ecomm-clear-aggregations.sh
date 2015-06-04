#!/bin/sh


curl http://lcanqnasv08:8983/solr/temp1_signals_aggr/update?stream.body=%3Cdelete%3E%3Cquery%3E*:*%3C/query%3E%3C/delete%3E
curl http://lcanqnasv08:8983/solr/temp1_signals_aggr/update?stream.body=%3Ccommit/%3E

