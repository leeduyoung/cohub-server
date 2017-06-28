var express = require('express');
var router = express.Router();
const db = require('../../service/db');

/* GET test. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  res.json({
    id: 'mango',
    isActive: true,
    age: '3',
    gender: 'male',
    email: 'mango@google.com'
  });
});

/* POST test. */
router.post('/', function (req, res, next) {

  // TODO: db에 post

  res.json({
    id: 'mango',
    isActive: true,
    age: '3',
    gender: 'male',
    email: 'mango@google.com'
  });
});

/* PUT test. */
router.put('/', function (req, res, next) {

  // TODO: db에 put

  res.json({
    id: 'mango',
    isActive: true,
    age: '3',
    gender: 'male',
    email: 'mango@google.com'
  });
});

/* PATCH test. */
router.patch('/', function (req, res, next) {

  // TODO: db에 patch

  res.json({
    id: 'mango',
    isActive: true,
    age: '3',
    gender: 'male',
    email: 'mango@google.com'
  });
});

module.exports = router;
