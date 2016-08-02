var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var db = require('./../../db_config');

autoIncrement.initialize(db);

var JournalEntrySchema = new Schema({
  entryNum: { type: Number, ref: 'EntryNum' },
  entryDate: Date,
  date: { month: String, day: Number, year: Number },
  moods: Array,
  topic: String,
  text: String
  //add created_at and updated_at?
  //need to add user_id or username so entries can be easily retrieved for users...
});

JournalEntrySchema.plugin(autoIncrement.plugin, 'JournalEntry');

module.exports = db.model('JournalEntry', JournalEntrySchema);