var express = require('express');
var router = express.Router();
const db = require('../../service/db');
const ideaService = require('./idea.service');
const passport = require('passport');

// idea 조회
router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {
  ideaService.findIdea(req.query.idea_id)
    .then(response => {
      console.log(response);
      res.json({
        success: true,
        idea: response
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false,
        error: error
      });
    });
});

// idea 올리기
router.post('/', passport.authenticate('bearer', { session: false }), function (req, res) {
  ideaService.inputIdea()
    .then(response => {
      console.log(response);
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false
      });
    });  
});

// 아이디어 수정
router.put('/', passport.authenticate('bearer', { session: false }), function (req, res) {
  ideaService.modifyIdea()
    .then(response => {
      console.log(response);
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false
      });
    });  
});

// 아이디어 삭제
router.delete('/', passport.authenticate('bearer', { session: false }), function (req, res) {
  ideaService.deleteIdea()
    .then(response => {
      console.log(response);
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: false
      });
    });  
});

module.exports = router;
