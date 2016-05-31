var http = require('http');

var fusionHost = "localhost";
var fusionPort = 8764;
var username = "admin";
var password = "password123";

var server = http.createServer(onRequest).listen(9292);


function onRequest(client_req, client_res) {

    client_res.setHeader('Access-Control-Allow-Origin', '*');
    client_res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    client_res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    console.log('serve: ' + client_req.url);


    var auth = 'Basic ' + new Buffer(username+":"+password).toString('base64');
    var header = {
        'Authorization': auth
    };

    var options = {
        hostname: fusionHost,
        port: fusionPort,
        path: client_req.url,
        method: client_req.method,
        headers: header
    };


    var proxy = http.request(options, function (res) {
        client_res.setHeader('Content-Type', res.headers['content-type']);
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}
