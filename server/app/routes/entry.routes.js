var express = require('express');
var router = express.Router();
var Entry = require('../models/entry.model');

router.route('/entries')
  .post(function(req, res) {
    var entry = new Entry();
    entry.date = req.body.date;
    entry.entryDate = req.body.entryDate;
    entry.moods = req.body.customMood || req.body.mood;
    entry.topic = req.body.topic;
    entry.text = req.body.text;
    entry.save(function(err) {
      if(err){
        res.send(err);
      }
      res.status(201).json({message: 'Entry was successfully saved!'});
    });
  })
  .get(function(req, res) {
    // Room.find({}).sort({date: 'descending'}).exec(function(err, docs) { ... });
    if(!req.query.id){
      console.log('Trying to fetch all entries');
      Entry.find({}).sort({entryDate: 'ascending'}).exec(function(err, entries){
        if(err){
          throw err;
        }
        res.json(entries);
      });
    } else {
      console.log('Trying to fetch single entry');
      Entry.findById(req.query.id, function(err, entry){
        if(err){
          throw err;
        }
        res.json(entry);
      });
    }
  })
  .put(function(req, res){
    console.log('Trying to update entry')
    var edits = new Entry();
    edits.date = req.body.date;
    edits.entryDate = req.body.entryDate;
    edits.moods = req.body.moods;
    edits.topic = req.body.topic;
    edits.text = req.body.text;

    Entry.findByIdAndUpdate(req.query.id, edits, function(err, entry){
      if(err){
        throw err;
      }
      res.json({message: 'Entry was updated!'});
    })
  })
  .delete(function(req, res){
    console.log('Trying to delete an entry');
    Entry.findByIdAndRemove(req.query.id, function(err){
      if(err){
        throw err;
      }
      res.json({message: 'Entry was deleted!'});
    })
  });

module.exports = router;