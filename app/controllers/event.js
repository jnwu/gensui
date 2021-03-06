var mongoose = require('mongoose')
	, Fiber = require('fibers')
	, Event = mongoose.model('Event')
	, Thing = mongoose.model('Thing');

exports.read = function(req, res){
	if(req.params.name && !req.params.id) {
		Fiber(function() {
			var fiber = Fiber.current;
			var events = [];

			// Get thing object
			Thing.find({ name: req.params.name }, function(err, result) {
				if(err) return fiber.throwInto(err); 
				fiber.run(result);
			});
			var result = Fiber.yield();

			// Get events of each following thing object
			for (var i=0;i<result[0].following.length;i++) {
				Event.find({ thing_name: result[0].following[i] }, function(err, result) {
					if(err) return fiber.throwInto(err); 
					fiber.run(result);
				});
				events = events.concat(Fiber.yield());				
			}

			// Add object events into array
			Event.find({ thing_name: result[0].name }, function(err, result) {
				if(err) return fiber.throwInto(err); 
				fiber.run(result);
			});
			
			events = events.concat(Fiber.yield());
			events.sort(function(a, b) { return new Date(b.created) - new Date(a.created); });

			// Apply after if applicable
			if (req.query.after) {
				var i = 0;

				while(i < events.length && (new Date(parseInt(req.query.after))).getTime() < (new Date(events[i].created)).getTime()) { i++; }
				events = events.splice(0, i);
			}	

			// Apply limit if applicable
			if (req.query.limit) events = events.splice(0, req.query.limit);			
					
			res.json(events);
		}).run();
	} else if(req.params.name && req.params.id){
		Event.find({ _id: req.params.id, thing_name: req.params.name }, function(err, result) {
			if(err) res.json(err);
			else res.json(result);
		});
	}
};

exports.create = function(req, res){
	var s = new Event({ 
		thing_name: req.params.name, 
		message: req.body.event.message 
	});
	s.save(function(err) {
		if(err) res.json(err);
	});
	res.json(s);
};