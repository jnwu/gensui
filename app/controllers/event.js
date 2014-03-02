var mongoose = require('mongoose')
	, Event = mongoose.model('Event');

exports.read = function(req, res){
	if(req.params.tid && !req.params.id) {
		Event.find({ thing_id: req.params.tid }, function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	} else if(req.params.tid && req.params.id){
		Event.find({ _id: req.params.id, thing_id: req.params.tid }, function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	}
};

exports.create = function(req, res){
	var s = new Event({ thing_id: req.params.tid, message: req.body.event.message });
	s.save(function(err) {
		if(err) {
			res.json(err);
		}
	});
	res.json(s);
};