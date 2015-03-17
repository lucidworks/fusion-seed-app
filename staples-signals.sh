#!/bin/sh

echo create a job to aggregate the click counts
curl -u admin:password123 -X POST -H 'Content-Type: application/json' -d '{"id":"staplesClickAggr", "signalTypes":["click"], "sourceCatchup": true, "aggregates":[{"type":"count", "sourceFields":["id"], "targetField": "count_d"}]}' http://162.242.133.12:8764/api/apollo/aggregator/aggregations

echo see if it is there
curl -u admin:password123 -X GET -H 'Content-Type: application/json' http://162.242.133.12:8764/api/apollo/aggregator/aggregations/staplesClickAggr

echo now run the job
curl -u admin:password123 -X POST -H 'Content-Type: application/json' http://162.242.133.12:8764/api/apollo/aggregator/jobs/staples1_signals/staplesClickAggr
