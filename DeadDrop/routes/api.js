//This file will contain service methods like readMessage() and saveMessage()
//Methods from this file will use functions from utility.js and datarepo.js

const express = require('express');
const router = express.Router();
const datarepo = require('../models/message.js');

// /GET
// api/message?latitude={latitude}&longitude={longitude}&range={range}
router.get('/message/', (req, res) => {
    var latitude = req.param('latitude');
    var longitude = req.param('longitude');
    var range = req.param('range');
    
    datarepo.getMessages(latitude, longitude, range, (err, result) => {
            if(err) {
                res.status(err.status || 500).json(err);
            }
            else {
                res.status(200).json({data: { messages: result} });
            }
    });
});

// /POST
// api/message (with JSON object sent in body)
router.post('/message/', (req, res) => {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var timestamp = req.body.timestamp;
    var message = req.body.message;

    datarepo.saveMessage(latitude, longitude, timestamp, message, (err, result) => {
        if(err) {
            res.status(err.status || 500).json(err);
        }
        else {
            res.status(200).send();
        }
    });
});

module.exports = router;