var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dead Drop' });
});

/* GET create message page */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Dead Drop - New Message' });
});

/* GET list of messages in the area */
router.get('/message', function(req, res, next) {
  var latitude = req.param('latitude');
  var longitude = req.param('longitude');
  var range = req.param('range');

  datarepo.getMessages(latitude, longitude, range, (err, result) => { //result is Array of JS objects
    res.render('list', { title: 'Dead Drop - Messages Around Here', messages: result });
  });
});

/* POST new message */
router.post('/message', function(req, res, next) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var timestamp = req.body.timestamp;
  var message = req.body.message;

  datarepo.saveMessage(latitude, longitude, timestamp, message, (err, result) => {
    res.render('index', { title: 'Submitted!' });
  });
});

module.exports = router;
