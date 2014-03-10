var mongoose = require('mongoose')
	, Event = mongoose.model('Event');

exports.read = function(req, res){
	if(req.params.name && !req.params.id) {
		Event.find({ thing_name: req.params.name }, function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	} else if(req.params.name && req.params.id){
		Event.find({ _id: req.params.id, thing_name: req.params.name }, function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	}
};

exports.create = function(req, res){
	var s = new Event({ 
		thing_name: req.params.name, 
		message: req.body.event.message 
	});
	s.save(function(err) {
		if(err) {
			res.json(err);
		}
	});
	res.json(s);
};