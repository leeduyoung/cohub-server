var express = require('express');
var router = express.Router();
const db = require('../../service/db.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {

  console.log(db);
  res.json({
    success: false,
    reason: '로그인 필요 요청',
    mango: '망고'
  });
});

router.put('/', function (req, res, next) {
  res.send('put respond with a resource');
});

router.patch('/', function (req, res, next) {
  res.send('patch respond with a resource');
});

module.exports = router;
