var db = require('mysql2-db');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var dbConStr = require('../config/db.json');

function createUser(username, password, callback) {
    bcrypt.hash(password, saltRounds).then(function (hash) {
        var stage = db.stage(dbConStr);
        stage.execute("insert into user(username, password) values (?,?)",
        [username, hash])
        .finale((err, result) => {
            if (err) {
                return callback(err);
            }
            else {
                callback(err, result);
            }
        });
    });
}

module.exports = {
    createUser
}