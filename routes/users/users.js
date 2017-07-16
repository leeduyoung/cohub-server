var express = require('express');
var router = express.Router();
const db = require('../../service/db');
const userService = require('./users.service');
const passport = require('passport');


// 로그인
router.post('/login', (req, res, next) => {
  console.log(req.body);
  console.log('next : ', next);
  userService.login(req.body)
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: '서버 오류'
      });
    });
});

// 자동 로그인
router.get('/login', passport.authenticate('bearer', { session: false }), function (req, res) {
  console.log('자동로그인 요청, req.user : ', req.user);
  res.json(req.user);
});

// 회원가입
router.post('/', function (req, res, next) {
  userService.signup(req.body)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: '회원가입 실패'
      });
    });
});

// 회원탈퇴
router.delete('/', passport.authenticate('bearer', { session: false }), function (req, res) {
  userService.deleteUser(req.user.user_id)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: ''
      });
    });
});

// 사용자 조회
router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {
  console.log('사용자 조회, req.query : ', req.query);
  userService.findUserList(req.query.text)
    .then(function(response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.put('/', function (req, res, next) {
  res.send('put respond with a resource');
});

router.patch('/', function (req, res, next) {
  res.send('patch respond with a resource');
});

// 아이디 중복체크
router.get('/id', function (req, res, next) {
  userService.userIdDuplicateCheck(req.query.id)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: '이미 가입된 이메일 주소입니다.'
      });
    });
});

// 닉네임 중복체크
router.get('/nickname', function (req, res, next) {
  userService.nicknameDuplicateCheck(req.query.nickname)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: '이미 가입된 닉네임 입니다.'
      });
    });
});

// 로그아웃
router.get('/logout', passport.authenticate('bearer', { session: false }), function (req, res) {
  console.log('logout, req.user.user_id : ', req.user.user_id);
  userService.logout(req.user.user_id)
    .then(response => {
      console.log(response);
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: ''
      });
    });
});

// 프로필 조회 
router.get('/profile', passport.authenticate('bearer', { session: false }), function (req, res) {
  userService.findUserProfile(req.user.user_id)
    .then(response => {
      console.log(response);
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: ''
      });
    });
});

// 프로필 수정
router.post('/profile', passport.authenticate('bearer', { session: false }), function (req, res) {
  console.log('req.user : ', req.user);
  console.log('req.body : ', req.body);
  userService.modifyUserProfile(req.body, req.user)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        message: ''
      });
    });
});

module.exports = router;
