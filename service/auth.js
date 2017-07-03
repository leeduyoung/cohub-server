const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('username : ', username);
    console.log('password : ', password);
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
    return done(null, {user:'test'});
  }
));

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));

module.exports = function (app) {
    return {
        initialize: initialize
    }

    function initialize() {

        //로컬 로그인 설정
        // localStrategySetting();

        // //페이스북 로그인 설정
        // facebookStrategySetting();

        // //구글 로그인 설정
        // googleStrategySetting();

        //패스포트 사용
        app.use(passport.initialize());
        app.use(passport.session());
    };
}


// exports.setup = function () {
//         console.log('username : ', username);
//     console.log('password : ', password);
//   passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//       },
//       function(email, password, done) {
//       // 인증 정보 체크 로직
//         if (email === 'test@test.com' && password === 'test') {
//         // 로그인 성공시 유저 아이디를 넘겨준다.
//           var user = {id: 'user_1'};
//           return done(null, user);
//         } else {
//           return done(null, false, { message: 'Fail to login.' });
//         }
//       }
//   ));
// };