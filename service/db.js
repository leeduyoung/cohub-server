// global
const pgp = require('pg-promise')();
const dbInfo = require('../resources/properties.js').dbInfo;

module.exports = pgp(dbInfo);