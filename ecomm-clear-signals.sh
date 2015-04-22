#!/bin/sh


echo clear signals

curl http://ec2-54-89-123-52.compute-1.amazonaws.com:8983/solr/products_signals/update?stream.body=%3Cdelete%3E%3Cquery%3E*:*%3C/query%3E%3C/delete%3E

curl http://ec2-54-89-123-52.compute-1.amazonaws.com:8983/solr/products_signals/update?stream.body=%3Ccommit/%3E
