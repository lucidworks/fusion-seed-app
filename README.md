
The Fusion seed app is a tool that aims to provide:
* A starting point for customizable demos, proof-of-concepts, and pilot projects.
* A reference application for integrating Fusion into web applications.

## Installation Requirements
This repository is packaged with a node http server and install, start and stop scripts. If you wish to use these scripts then node is a requirement.
* Node

## Installing and Running
1. git clone https://github.com/LucidWorks/fusion-seed-app.git
2. cd fusion-seed-app
3. bin/install
4. bin/start
5. Go to http://localhost:8000/app/#/ecomm

By default, this will point to an existing Fusion server hosted on AWS. To point this to another server and for other application settings see app/ecomm/services/ecomm-service.js

Features
* Easy to skin
* Can run on any server technology that can serve HTML and javascirpt files.
* Signals, Aggregations and Recommendations (EventMiner coming soon)
* Product page demonstrating 3 different recommendation types.
* Dynamic faceting
* Auto-complete (built on signals_aggr by default)
* Spell-checking ("did you mean.." suggestions)
* Developer assistance (shows live requests being sent to Fusion and the JSON responses).

Roadmap
* Paging

## Notes On Skinning
This app uses Bootstrap and AngularJS. It uses Bootstrap's grid system to control page layout. Here is a list of files of interest that could be modified in order to customize the skin:
* app/index.html - The header and footer.
* app/ecomm/view-search.html - Everything in-between the header and footer including the 2 column layout.
* app/app.css - All custom styles.

## Notes On Project Files
This project is made up of several modules. Each module adheres to the following structure:
* app/_module_name_ - Contains the module, including any controllers and views.
  * app/<module name>/directives - Contains custom directive js and html files.
  * app/<module name>/services - Contains any custom services.

# Module Descriptions
* app/ecomm - Contains the e-commerce demo.
* app/solr - Contains any directives, services, controllers, or views that encapsulate Solr-related functionality. For this app, it is just a handful of directives for rendering elements from a Solr response.
* app/fusion - Contains any directives, services, controllers, or views that encapsulate Fusion-related functionality. This includes a simple wrapper of Fusion's REST API using Angular's $http service.
