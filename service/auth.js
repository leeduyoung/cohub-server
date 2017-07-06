const db = require('./db');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log('username : ', username);
//     console.log('password : ', password);
//     // User.findOne({ username: username }, function(err, user) {
//     //   if (err) { return done(err); }
//     //   if (!user) {
//     //     return done(null, false, { message: 'Incorrect username.' });
//     //   }
//     //   if (!user.validPassword(password)) {
//     //     return done(null, false, { message: 'Incorrect password.' });
//     //   }
//     //   return done(null, user);
//     // });
//     return done(null, {user:'test'});
//   }
// ));

passport.use(new BearerStrategy(
  function(token, cb) {
    let query = `SELECT * FROM users WHERE token = $1`;
    console.log('token : ', token);
    db.one(query, token)
       .then(response => {
        console.log('response : ', response);
        if (!response) { return cb(null, false); }
        return cb(null, response);
       })
       .catch(error => {
        console.log('error : ', error);
        return cb(null, false);
       });
  }));

  

module.exports = function (app) {
    return {
        initialize: initialize
    }

    function initialize() {
        //패스포트 사용
        app.use(passport.initialize());
        app.use(passport.session());
    };
}
