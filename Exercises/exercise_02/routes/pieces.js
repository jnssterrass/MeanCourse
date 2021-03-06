var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var winston = require('winston');
var ObjectID = require('mongodb').ObjectID;

router.get('/', function (req, res, next) {
  mongo.connect("mongodb://localhost:27017/exercise2", function (err, db) {
    if (!err) {
      winston.info("We are connected");
      var collection = db.collection('pieces');
      collection.find({},{'type':true}).toArray(function (err, result) {
        winston.info(result);
        res.status(200).send(result);
      });
    }
  });
  //Retrieve all pieces
});

router.get('/:id', function (req, res, next) {
  mongo.connect("mongodb://localhost:27017/exercise2", function (err, db) {
    var id = new ObjectID(req.params.id);
    if (!err) {
      winston.info("We are connected");
      var collection = db.collection('pieces');
      collection.find({'_id':id}).toArray(function (err, result) {
        winston.info(result);
        res.status(200).send(result);
      });
    }
  });
  //Retrieve all pieces
});

router.post('/', function(req, res, next) {
  mongo.connect("mongodb://localhost:27017/exercise2", function (err, db) {
    var json = req.body;
    if (!err) {
      winston.info("We are connected");
      var collection = db.collection('pieces');
      collection.insert(json);
      res.status(200).send(true);
    }
  });
  //Create new piece
});

router.delete('/:id', function(req, res, next) {
  mongo.connect("mongodb://localhost:27017/exercise2", function (err, db) {
    var id = new ObjectID(req.params.id);
    if (!err) {
      winston.info("We are connected");
      var collection = db.collection('pieces');
      collection.remove({'_id': id});
      res.status(200).send(true);
    }
  });
  //Delete from DB.
});

router.patch('/:id', function(req, res, next) {
  mongo.connect("mongodb://localhost:27017/exercise2", function (err, db) {
    var id = new ObjectID(req.params.id);
    var type = req.body.type;
    var location = req.body.location;
    var cost = req.body.cost;
    var json = req.body;
    if (!err) {
      winston.info("We are connected");
      var collection = db.collection('pieces');
      collection.update({'_id': id},{$set:json}, {multi:true});
      res.status(200).send(true);
    }
  });
  //Update on db
});

module.exports = router; //When calling require('tasks'), we get the router.