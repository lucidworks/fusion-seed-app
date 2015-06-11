#!/bin/sh

echo Create and run aggregation jobs for click and addToCart.

echo Creating click and addToCart aggregation Jobs
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"clickAggr", "signalTypes":["click"], "sourceCatchup": true}' http://$1/api/apollo/aggregator/aggregations
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"cartAggr", "aggregator": "click", "signalTypes":["addToCart"], "sourceCatchup": true}' http://$1/api/apollo/aggregator/aggregations


echo now run the job
curl -u admin:password123 -X POST -H 'Content-Type: application/json' http://$1/api/apollo/aggregator/jobs/$2/cartAggr
curl -u admin:password123 -X POST -H 'Content-Type: application/json' http://$1/api/apollo/aggregator/jobs/$2/clickAggr
