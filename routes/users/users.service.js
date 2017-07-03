const db = require('../../service/db');

let userService = {
    signup: signup,
    signin: signin,
}

function signup(userInfo) {
    console.log('userInfo : ', userInfo);

    return new Promise((resolve, reject) => {
        console.log('into promise');
        // console.log(userInfo.profileImage);
        if (userInfo.profileImage == null) {
            userInfo.profileImage = 'https://s3.ap-northeast-2.amazonaws.com/dogether-sns/profiles/default.png';
        }

        let query = `INSERT INTO users(user_id, nickname, password, profile_image, enable, signup_time, provider)
                VALUES ($1, $2, $3, $4, true, now(), 'local')`;


        console.log(db.none(query, [userInfo.userId, userInfo.nickname, userInfo.password, userInfo.profileImage]));
        return db.none(query, [userInfo.userId, userInfo.nickname, userInfo.password, userInfo.profileImage]);
    });
}

function signin() {
    console.log('signin');
}

module.exports = userService;