var mongoose = require('mongoose')
	, Thing = mongoose.model('Thing');

exports.read = function(req, res){
	if(req.params.name) {
		Thing.find({ name: req.params.name }, function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	} else {
		Thing.find(function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	}
};

exports.create = function(req, res){
	var s = new Thing({ 
		name: req.body.thing.name, 
		following: req.body.thing.following 
	});

	s.save(function(err) {
		if(err) {
			res.json(err);
		}
	});
	res.json(s);
};
