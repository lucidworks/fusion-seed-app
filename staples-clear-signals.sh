#!/bin/sh


echo clear signals

curl http://162.242.133.12:8983/solr/staples1_signals/update?stream.body=%3Cdelete%3E%3Cquery%3E*:*%3C/query%3E%3C/delete%3E

curl http://162.242.133.12:8983/solr/staples1_signals/update?stream.body=%3Ccommit/%3E
