// establish a connection with the database
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/journal';
mongoose.connect(mongoURI);

// log out any db issues here
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open: ', mongoURI);
});

module.exports = db;