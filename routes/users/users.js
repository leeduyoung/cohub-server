var express = require('express');
var router = express.Router();
const db = require('../../service/db');
const userService = require('./users.service');
const passport = require('passport');

// router.get('/', passport.authenticate('local', {session:false}), function (req, res) {
router.get('/', passport.authenticate('bearer', {session: false}), 
  function (req, res) {
    console.log('get router');
    console.log('req.user : ', req.user);
    // console.log('res : ', res);    
    res.json(req.user);
  });

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
//   userService.signin();
// });

/**
 * 회원가입 
 */
router.post('/', function (req, res, next) {
  console.log(req.body);

  userService.signup(req.body)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

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
