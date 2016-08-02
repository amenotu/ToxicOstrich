// BASE SETUP
// ============================================================

// Require the modules we'll need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db_config');
var Entry = require('./app/models/entry.model');
var User = require('./app/models/user.model');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8000;

// ROUTES FOR OUR API
// ============================================================
// get an instance of the Express Router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Something is happening');
  next();
});

// more routes for our API will happen here
var entry = require('./app/routes/entry.routes.js');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/api', router);
app.use('/api', entry);

// serve static files
app.use(express.static(__dirname + '/../client'));

// fire up the server
app.listen(port);
console.log("Building fires at port: ", port, " *sizzzzzzzzzzzzle*");