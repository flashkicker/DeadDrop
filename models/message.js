var db = require('mysql2-db');
var dbConStr = require('../config/db.json');

function getMessages(latitude, longitude, range, callback) {
    var stage = db.stage(dbConStr);
    a = latitude - range;
    b = latitude + range;
    c = longitude - range;
    d = longitude + range;
    
    stage.query('SELECT * FROM `messages` WHERE (CONVERT(?, DECIMAL(13,10))<`latitude` AND `latitude`<CONVERT(?, DECIMAL(13,10))) AND (CONVERT(?, DECIMAL(13,10))<`longitude` AND `longitude`<CONVERT(?, DECIMAL(13,10))) ORDER BY `message_id` DESC', [a, b, c, d]);
    stage.finale((err, results) => {
        callback(err, results);
    });
}

function saveMessage(latitude, longitude, timestamp, message, creator_id, creator_username, callback) {
    var stage = db.stage(dbConStr);
    stage.execute("insert into messages(message,timestamp,latitude,longitude,creator_id,creator_username) values(?,?,?,?,?,?)", [message, timestamp, latitude, longitude, creator_id, creator_username]);
    stage.finale((err, result) => {
        callback(err, result);
    });
}

function getMessagesById(creator_id, callback) {
    var stage = db.stage(dbConStr);
    stage.query("SELECT * FROM messages WHERE creator_id=?", [creator_id]);
    stage.finale((err, result) => {
        callback(err, result);
    });
}

function editMessage(message, message_id, callback) {
    var stage = db.stage(dbConStr);
    stage.execute("UPDATE messages SET message=? WHERE message_id=?", [message, message_id]);
    stage.finale((err, result) => {
        callback(err, result);
    });
}

function deleteMessage(message_id, callback) {
    var stage = db.stage(dbConStr);
    stage.execute("DELETE FROM messages WHERE message_id=?", [message_id]);
    stage.finale((err, result) => {
        callback(err, result);
    });
}

module.exports = {
    getMessages,
    saveMessage,
    getMessagesById,
    editMessage,
    deleteMessage
}