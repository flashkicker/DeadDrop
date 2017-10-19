const express = require('express');
const router = express.Router();
const datarepo = require('../models/message.js');

var appTitle = 'DeadDrop';
var msgListTitle = appTitle + ' - Messages Around Here';
var createMsgTitle = appTitle + ' - New Message';

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: appTitle });
});

/* GET create message page */
router.get('/create', function(req, res, next) {
  res.render('create', { title: createMsgTitle });
});

/* GET list of messages in the area */
router.get('/message', function(req, res, next) {
  var latitude = req.param('latitude');
  var longitude = req.param('longitude');
  var range = req.param('range');

  datarepo.getMessages(latitude, longitude, range, (err, result) => { //result is Array of JS objects
    res.render('list', { title: msgListTitle, messages: result });
  });
});

/* POST new message */
router.post('/message', function(req, res, next) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var timestamp = req.body.timestamp;
  var message = req.body.message;

  datarepo.saveMessage(latitude, longitude, timestamp, message, (err, result) => {
    res.render('index', { title: msgListTitle, success: 'Your message was created!' });
  });
});

module.exports = router;
