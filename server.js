"use strict";

require('colors');

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	http        = require('http'),
	path        = require('path'),
	serveStatic = require('serve-static'),
	httpProxy 	= require('http-proxy');

var app = express();
var server = http.createServer(app);
var apiProxy = httpProxy.createProxyServer();

// proxify api routes
app.all("/api/*", function(req, res){ 
  apiProxy.web(req, res, { target: 'http://iagl-server.cloudapp.net' });
});

app.set('port', process.env.PORT || 3001);
app.use(serveStatic(path.join(__dirname, '.')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'admin.html'));
});

server.listen(app.get('port'), function() {
	console.log('✔︎︎ Express server listening on http://localhost:%d/'.green, app.get('port'));
});
