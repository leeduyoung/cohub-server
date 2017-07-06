const db = require('../../service/db');
const bcrypt = require('bcrypt-nodejs');

let userService = {
    signup: signup,
    signin: signin,
}

function signup(userInfo) {
    console.log('userInfo : ', userInfo);
    return new Promise((resolve, reject) => {
        console.log('into promise');

        /**
         * 1. 패스워드 해시
         * 2. 디폴트 이미지 s3 url추가
         * 3. 회원가입 실시
         */
        encryptePassword(userInfo.password)
            .then(hash => {
                if (userInfo.profileImage == null) {
                    userInfo.profileImage = 'https://s3.ap-northeast-2.amazonaws.com/dogether-sns/profiles/default.png';
                }
                let query = `INSERT INTO users(user_id, nickname, password, profile_image, enable, signup_time, provider)
                VALUES ($1, $2, $3, $4, true, now(), 'local')`;

                console.log('query: ', db.none(query, [userInfo.userId, userInfo.nickname, userInfo.password, userInfo.profileImage]));
                return db.none(query, [userInfo.userId, userInfo.nickname, userInfo.password, userInfo.profileImage]);
                // return 'test';
                // resolve()
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

function signin() {
    console.log('signin');

    // Load hash from your password DB.
    // bcrypt.compare("bacon", hash, function (err, res) {
    //     // res == true
    //     console.log('res : ', res);
    // });
}

// todo : id 중복 체크
function userIdDuplicateCheck() {

}

// todd: nickname 중복 체크
function nicknameDuplicateCheck() {

}

function encryptePassword(plainPassword) {
    return new Promise((resolve, reject) => {
        console.log('plainPassword : ', plainPassword);
        bcrypt.hash(plainPassword, null, null, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
}

module.exports = userService;