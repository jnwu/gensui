var controllers = require('../app/controllers')
	, thing = require('../app/controllers/thing')
	, event = require('../app/controllers/event');

module.exports = function (app) {
	app.get('/', controllers.index);
	
	app.get('/things', thing.read);
	app.get('/thing/:id', thing.read);
	app.post('/thing', thing.create);

	app.get('/thing/:tid/events', event.read);
	app.get('/thing/:tid/event/:id', event.read);
	app.post('/thing/:tid/event', event.create);
}