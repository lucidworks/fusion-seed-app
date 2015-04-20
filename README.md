
The Fusion seed app is a tool that aims to provide:
* A starting point for customizable demos, proof-of-concepts, and pilot projects.
* A reference application for integrating Fusion into web applications.

## Installation Requirements
This repository is packaged with a node http server and install, start and stop scripts. If you wish to use these scripts then node is a requirement.
* Node

## Installing and Running
1. git clone https://github.com/LucidWorks/fusion-seed-app.git
2. cd fustion-seed-app
3. bin/install
4. bin/start
5. Go to: http://localhost:8000/app/#/ecomm

By default, this will point to a Fusion server hosted on AWS. To point this to another server and for other application settings see app/ecomm/services/ecommService.js

Features
* Easy to skin
* Can run on any server technology that can serve HTML and javascirpt files.
* Signals, Aggregations and Recommendations (EventMiner coming soon)
* Product page demonstrating 3 different recommendation types.
* Dynamic faceting
* Auto-complete
* Spell-checking ("did you mean.." suggestions)
* Developer assistance (shows live requests being sent to Fusion and the JSON responses).

Roadmap
* Paging
