var db = require('mysql2-db');
var dbConStr = require('../config/db.json');

function getMessages(latitude, longitude, range, callback) {
    var stage = db.stage(dbConStr);
    stage.query("select * from messages");
    stage.finale((err, results) => {
                        if (err) return callback(err);
                        else return callback(err, results);
                    });
}

function saveMessage(latitude, longitude, timestamp, message, callback) {
    var stage = db.stage(dbConStr);
    stage.execute("insert into messages(message,timestamp,latitude,longitude) values(?,?,?,?)", [message, timestamp, latitude, longitude]);
    stage.finale((err, result) => {
        if (err) return callback(err);
        else return callback(err, result);
    });
}

module.exports = {
    getMessages: getMessages,
    saveMessage: saveMessage
}