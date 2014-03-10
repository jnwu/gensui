var controllers = require('../app/controllers')
	, thing = require('../app/controllers/thing')
	, event = require('../app/controllers/event');

module.exports = function (app) {
	app.get('/', controllers.index);
	
	app.get('/things', thing.read);
	app.get('/thing/:name', thing.read);
	app.post('/thing', thing.create);

	app.get('/thing/:name/events', event.read);
	app.get('/thing/:name/event/:id', event.read);
	app.post('/thing/:name/event', event.create);
}