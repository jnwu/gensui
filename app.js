var http = require('http');

var mongoose = require('mongoose')
	, Thing = require('./app/models/thing')
	, Event = require('./app/models/event');

var express = require('express')
 	, app = express()
 	, exports = module.exports = app
 	, env = app.get('env')
 	, environment = require('./config/environment')
 	, routes = require('./config/routes')(app);

var database = require('./config/database');

if (env == 'development') {
	database = database['development'];
	app.use(express.errorHandler());
} else if(env == 'test') {
	database = database['test'];
} else if(env == 'production') {
	database = database['production'];
}

// database connect
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect('mongodb://'
		+database['username']+':'
		+database['password']+'@'
		+database['host']+':'
		+database['port']+'/'
		+database['database'], options);	
}

var db = mongoose.connection;
db.on('error', function (err) {
  	console.log(err);
});
db.on('disconnected', function () {
  	connect();
});

connect();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});