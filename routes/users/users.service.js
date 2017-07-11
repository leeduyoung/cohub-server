const db = require('../../service/db');
const bcrypt = require('bcrypt-nodejs');
const randtoken = require('rand-token');

let userService = {
    signup: signup,
    login: login,
    userIdDuplicateCheck: userIdDuplicateCheck,
    nicknameDuplicateCheck: nicknameDuplicateCheck,
    logout: logout,
    deleteUser: deleteUser,
    findUserProfile: findUserProfile,
    modifyUserProfile: modifyUserProfile,
    findUserList: findUserList,
}

function signup(userInfo) {
    console.log('userInfo : ', userInfo);
    return new Promise((resolve, reject) => {
        console.log('userInfo : ', userInfo);

        /**
         * 1. 패스워드 해시
         * 2. 토큰값 생성
         * 3. 디폴트 이미지 s3 url추가
         * 4. 회원가입 실시
         */
        encryptePassword(userInfo.password)
            .then(hash => {
                if (userInfo.profileImage == null) {
                    userInfo.profileImage = 'https://s3.ap-northeast-2.amazonaws.com/dogether-sns/profiles/default.png';
                }
                let query = `INSERT INTO users(user_id, nickname, password, profile_image, enable, signup_time, provider, token)
                VALUES ($1, $2, $3, $4, true, now(), 'local', $5)`;
                resolve(db.none(query, [userInfo.user_id, userInfo.nickname, hash, userInfo.profileImage, randtoken.suid(32)]));
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

function login(userInfo) {
    console.log('login');
    return new Promise((resolve, reject) => {
        /**
         * 1. 아이디로 회원정보 조회
         * 2. 비밀번호 확인
         */
        let query = `SELECT * FROM users WHERE user_id = $1`;
        let token;
        db.one(query, userInfo.user_id)
            .then(response => {
                console.log(response);
                token = response.token;
                return comparePassword(userInfo.password, response.password);
            })
            .then(response => {
                if (response) {
                    resolve({ success: true, token: token });
                }
                else {
                    resolve({ success: false, message: '아이디 또는 비밀번호를 확인 해주세요.' });
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

function userIdDuplicateCheck(userId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM users WHERE user_id = $1`;
        resolve(db.none(query, userId));
    });
}

function nicknameDuplicateCheck(nickname) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM users WHERE nickname = $1`;
        resolve(db.none(query, nickname))
    });
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

function comparePassword(plainPassword, encryptePassword) {
    console.log(plainPassword);
    console.log(encryptePassword);
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, encryptePassword, function (err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
}

function logout(token) {
    return new Promise((resolve, reject) => {
        /**
         * 1. token에 해당되는 유저의 token을 삭제한다.
         */
        let query = `UPDATE users SET token = NULL WHERE token = $1`;
        db.none(query, token)
            .then(() => {
                resolve(true);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

function deleteUser(token) {
    return new Promise((resolve, reject) => {
        /**
         * 1. token에 해당되는 유저의 {enable: false}로 변경하고 
         * 2. disable_time을 업데이트 합니다.
         */
        let query = `update users set enable = false, disable_time = now() where token = $1`;
        db.none(query, token)
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

function findUserProfile() {

}

function modifyUserProfile() {

}

function findUserList() {

}

module.exports = userService;