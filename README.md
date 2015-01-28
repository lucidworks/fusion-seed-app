

The idea of this repository is to provide a "barebones" or blank "canvas" UI for PoCs where the built-in Fusion UI is not enough (or too much). It can also be used as a tool to demonstrate how to integrate Solr/Fusion with client-side UIs.

Installation Requirements
Node

Assumptions
Fusion is installed on localhost with standard ports.

Installation
1. After cloning this repository:
  cd fusion-seed-ui
  npm install
  npm install corsproxy
  npm start
2. Open a new terminal window and start the proxy:
  corsproxy



This code is based off of the angular seed app.
https://github.com/angular/angular-seed
