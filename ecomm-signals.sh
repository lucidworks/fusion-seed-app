#!/bin/sh


echo Creating click and addToCart aggregation Jobs
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"clickAggr", "signalTypes":["click"], "sourceCatchup": true}' http://162.242.133.12:8764/api/apollo/aggregator/aggregations
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"cartAggr", "aggregator": "click", "signalTypes":["addToCart"], "sourceCatchup": true}' http://162.242.133.12:8764/api/apollo/aggregator/aggregations


echo now run the job
curl -u admin:password123 -X POST -H 'Content-Type: application/json' http://162.242.133.12:8764/api/apollo/aggregator/jobs/ecomm1_signals/cartAggr
curl -u admin:password123 -X POST -H 'Content-Type: application/json' http://162.242.133.12:8764/api/apollo/aggregator/jobs/ecomm1_signals/clickAggr
