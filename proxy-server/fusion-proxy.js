/**
 * Created by evanpease on 3/20/15.
 */
var http = require('http');

http.createServer(onRequest).listen(9292);

function onRequest(client_req, client_res) {
    console.log('serve: ' + client_req.url);


    var auth = 'Basic ' + new Buffer("admin:password123").toString('base64');
    var header = {'Authorization': auth};

    var options = {
        hostname: 'localhost',
        port: 8764,
        path: client_req.url,
        method: client_req.method,
        headers: header
    };


    var proxy = http.request(options, function (res) {
        res.setHeader
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}
