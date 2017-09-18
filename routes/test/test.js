var express = require('express');
var router = express.Router();
const db = require('../../service/db');

var request = require('request'), //url의 html 긁어올때 사용.
    cheerio = require('cheerio');

// var $ = require('jquery');


/* GET test. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');


  var url = "http://codenamu.org/blog/";

  // url의 html 긁어오기
  request(url, function (err, res, html) {
    if (!err) {
      // console.log('html: ', html);

var $ = cheerio.load(html);
console.log($);
    $('a').each(function(i, element){
      var a = $(this).prev();
      console.log(a.text());
    });
    }
  })

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
