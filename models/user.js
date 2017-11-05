var db = require('mysql2-db');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var dbConStr = require('../config/db.json');
var stage = db.stage(dbConStr);

function createUser(username, password, callback) {
    bcrypt.hash(password, saltRounds).then(function (hash) {
        stage.execute("insert into user(username, password) values (?,?)",
        [username, hash])
        .finale((err, result) => {
            callback(err, result);
        });
    });
}

function getUser(username, callback) {
    stage.query("select * from user where username=?", [username])
    .finale((err, result) => {
        callback(err, result);
    });
}

function getUserById(id, callback) {
    stage.query("select id, username, password from user where id=?", [id])
    .finale((err, result) => {
        callback(err, result);
    });
}

module.exports = {
    createUser,
    getUser,
    getUserById
}