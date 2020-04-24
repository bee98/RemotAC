var express = require('express');
var router = express.Router();
const sensor = require('../controllers/sensor');
const remote = require('../controllers/remote');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hello');
  next();
});
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/sensor', function(req, res, next) {
  sensor.index(req, res, next);
});
router.post('/mode', function(req, res, next) {
  remote.index(req, res, next);

});
module.exports = router;
