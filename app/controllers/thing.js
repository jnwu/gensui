var mongoose = require('mongoose')
	, Thing = mongoose.model('Thing');

exports.read = function(req, res){
	if(req.params.name) {
		Thing.find({ name: req.params.name }, function(err, result) {
			if(err) res.json(err); 
			else res.json(result);
		});
	} else {
		Thing.find(function(err, result) {
			if(err) res.json(err); 
			else res.json(result);
		});
	}
};

exports.create = function(req, res){
	if(req.body.thing.name) {
		Thing.find({ name: req.body.thing.name }, function(err, result) {
			if(result.length == 0) {
				var t = new Thing({ 
					name: req.body.thing.name, 
					following: req.body.thing.following 
				});

				t.save(function(err) {
					if(err) res.json(err);
				});
				res.json(t);
			} else res.json(result);
		});
	}
};

exports.update = function(req, res){
	if(req.params.name) {
		Thing.find({ name: req.params.name }, function(err, result) {
			if(err) res.json(err); 
			else {
				result[0].following = result[0].following.concat(req.body.thing.following);
				result[0].save(function(err) {
					if(err) res.json(err);
				});

				res.json(result);
			}
		});
	}
};
