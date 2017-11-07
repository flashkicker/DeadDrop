var db = require('mysql2-db');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

var dbConStr = require('../config/db.json');

function createUser(username, password, callback) {
    var stage = db.stage(dbConStr);
    bcrypt.hash(password, saltRounds).then(function (hash) {
        stage.execute("insert into user(username, password) values (?,?)", [username, hash])
        .finale((err, result) => {
            callback(err, result);
        });
    });
}

function saveToken(id, token, callback) {
    var stage = db.stage(dbConStr);
    stage.execute("update user set token=? where id=?", [token, id])
    .finale((err, result) => {
        callback(err, result);
    });
}

function generateAuthToken(user) {
    var id = user[0].id;
    var payload = {
        id: id
    };
    var token = jwt.sign(payload, 'super-secret', {
        expiresIn: '1d' 
    });
    saveToken(id, token, (err, result) => {
        if(err) {
            console.log(err);
        }
    });
    return token;
}

function getUser(username, callback) {
    var stage = db.stage(dbConStr);
    stage.query("select * from user where username=?", [username])
    .finale((err, result) => {
        callback(err, result);
    });
}

function getUserById(id, callback) {
    var stage = db.stage(dbConStr);
    stage.query("select id, username, password from user where id=?", [id])
    .finale((err, result) => {
        callback(err, result);
    });
}

function getUserByToken(token, callback) {
    var stage = db.stage(dbConStr);
    stage.query("select id, username from user where token=?", [token])
    .finale((err, result) => {
        callback(err, result);
    })
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByToken,
    generateAuthToken,
    saveToken
}