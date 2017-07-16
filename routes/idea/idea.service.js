const db = require('../../service/db');

let ideaService = {
    findIdea: findIdea,
    inputIdea: inputIdea,
    modifyIdea: modifyIdea,
    deleteIdea: deleteIdea,
}

function findIdea(ideaId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM idea WHERE idea_id = $1`;
        resolve(db.one(query, ideaId));
    });
}

function inputIdea(idea) {
    return new Promise((resolve, reject) => {
        //TODO
        let query = `INSERT INTO idea(user_id, content, media_id, category_id) VALUES (now(), $1, $2, $3, $4) RETURNING idea_id`;
        resolve(db.one(query, [idea.user_id, idea.content, idea.media_id, idea.category_id]));
    });
}

function modifyIdea(idea) {
    return new Promise((resolve, reject) => {
        //TODO
        let query = `UPDATE idea SET post_time = $1, content = $2, media_id = $3, category_id = $4  WHERE idea_id = $5`;
        resolve(db.none(query, [now(), idea.content, idea.media_id, idea.category_id, idea.idea_id]));
    });
}

function deleteIdea(ideaId) {
    return new Promise((resolve, reject) => {
        //TODO
        let query = `DELETE from idea where idea_id = $1`;
        resolve(db.none(query, ideaId));
    });
}

module.exports = ideaService;