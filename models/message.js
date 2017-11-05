var db = require('mysql2-db');
var dbConStr = require('../config/db.json');

function getMessages(latitude, longitude, range, callback) {
    var stage = db.stage(dbConStr);
    a = latitude - range;
    b = latitude + range;
    c = longitude - range;
    d = longitude + range;
    
    stage.query('SELECT * FROM `messages` WHERE (CONVERT(?, DECIMAL(13,10))<`latitude` AND `latitude`<CONVERT(?, DECIMAL(13,10))) AND (CONVERT(?, DECIMAL(13,10))<`longitude` AND `longitude`<CONVERT(?, DECIMAL(13,10))) ORDER BY `uuid` DESC', [a, b, c, d]);
    stage.finale((err, results) => {
        callback(err, results);
    });
}

function saveMessage(latitude, longitude, timestamp, message, callback) {
    var stage = db.stage(dbConStr);
    stage.execute("insert into messages(message,timestamp,latitude,longitude) values(?,?,?,?)", [message, timestamp, latitude, longitude]);
    stage.finale((err, result) => {
        callback(err, result);
    });
}

module.exports = {
    getMessages: getMessages,
    saveMessage: saveMessage
}