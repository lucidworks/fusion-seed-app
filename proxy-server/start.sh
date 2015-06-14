#!/bin/sh
echo Starting Fusion Proxy
nohup node fusion-proxy.js server.log 2>&1 &
echo $! > server.pid