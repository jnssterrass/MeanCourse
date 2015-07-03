var winston = require('winston');
var express = require('express');
var router = express.Router();
var Race = require('mongoose').model('Race');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', function(req, res, next){
  Race.find({}, {'_id':false}, function(err, data) {
    if(!err) {
      res.status(200).json(data);
    }
  })
});

router.get('/:id', function (req, res, next) {
  var raceId = req.params.id;
  Race.find({_id: new ObjectId(raceId)}, {_id: false}, function(err, data) {
    if(!err) {
      res.status(200).json(data);
    }
  })
});

router.post('/', function(req, res, next) {
  mongo.connect("mongodb://localhost:27017/exercise3", function (err, db) {
    var json = req.body;
    if (!err) {
      winston.info("We are connected");
      var collection = db.collection('races');
      collection.insert(json);
      res.status(200).send(true);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  var taskId = req.params.id;
  Ship.remove({_id: new ObjectId(taskId)}, function(err){
    if(!err) {
      res.status(200).send(true);
    }
  });
});

router.patch('/:id', function(req, res, next) {
  mongo.connect("mongodb://localhost:27017/exercise3", function (err, db) {
    var id = new ObjectID(req.params.id);
    var type = req.body.type;
    var location = req.body.location;
    var cost = req.body.cost;
    var json = req.body;
    if (!err) {
      winston.info("We are connected");
      var collection = db.collection('races');
      collection.update({'_id': id},{$set:json}, {multi:true});
      res.status(200).send(true);
    }
  });
});

module.exports = router; //When calling require('tasks'), we get the router.