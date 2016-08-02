var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
var db = require('./../../db_config');

var UserSchema = new Schema({
  userId: {type: Number, ref: 'userId'},
  name: String,
  email: String,
  password: String
});

UserSchema.plugin(autoIncrement.plugin, 'JournalEntry');

module.exports = db.model('User', UserSchema);