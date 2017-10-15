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
  res.render('list', { title: 'Dead Drop - Messages Around Here'});
});

/* POST new message */
router.post('/message', function(req, res, next) {
  res.render('index', { title: 'Submitted!' });
});

module.exports = router;
