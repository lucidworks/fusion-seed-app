#!/bin/sh

echo create a job to aggregate the click counts
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"clickAggr", "signalTypes":["click"], "sourceCatchup": false, "aggregates":[{"type":"count", "sourceFields":["id"], "targetField": "count_d"}]}' http://162.242.133.12:8764/api/apollo/aggregator/aggregations
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"cartAggr", "aggregator": "click", "signalTypes":["addToCart"], "sourceCatchup": false, "aggregates":[{"type":"count", "sourceFields":["id"], "targetField": "count_d"}]}' http://162.242.133.12:8764/api/apollo/aggregator/aggregations

echo see if it is there
curl -u admin:password123 -X GET -H 'Content-Type: application/json' http://162.242.133.12:8764/api/apollo/aggregator/aggregations/cartAggr

echo now run the job
curl -u admin:password123 -X POST -H 'Content-Type: application/json' http://162.242.133.12:8764/api/apollo/aggregator/jobs/staples1_signals/cartAggr
curl -u admin:password123 -X POST -H 'Content-Type: application/json' http://162.242.133.12:8764/api/apollo/aggregator/jobs/staples1_signals/clickAggr



curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"clickAggr", "signalTypes":["click"], "sourceCatchup": false}' http://162.242.133.12:8764/api/apollo/aggregator/aggregations
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"cartAggr", "aggregator": "click", "signalTypes":["addToCart"], "sourceCatchup": false}' http://162.242.133.12:8764/api/apollo/aggregator/aggregations
