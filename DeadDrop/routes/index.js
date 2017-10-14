var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dead Drop' });
});

router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Dead Drop - New Message' });
});

module.exports = router;
