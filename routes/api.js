//This file will contain service methods like readMessage() and saveMessage()
//Methods from this file will use functions from utility.js and datarepo.js

const express = require('express');
const router = express.Router();
const messageRepo = require('../models/message.js');
var authenticate = require('./authenticate');

// /GET
// api/message?latitude={latitude}&longitude={longitude}&range={range}
router.get('/message/', (req, res) => {
    var latitudeParam = req.query.latitude;
    var longitudeParam = req.query.longitude;
    var rangeParam = req.query.range;
  
    let latitude = parseFloat(latitudeParam);
    let longitude = parseFloat(longitudeParam);
    let range = parseFloat(rangeParam);
    
    messageRepo.getMessages(latitude, longitude, range, (err, result) => {
            if(err) {
                res.json({
                    success: false,
                    err: err
                })
            }
            else {
                res.json({
                    success: true,
                    data: {
                        messages: result
                    }
                });
            }
    });
});

// /POST
// api/message (with JSON object sent in body)
router.post('/message/', authenticate, (req, res) => {
    var latitude = req.body.data.message.latitude;
    var longitude = req.body.data.message.longitude;
    var timestamp = req.body.data.message.timestamp;
    var message = req.body.data.message.message;
    
    messageRepo.saveMessage(latitude, longitude, timestamp, message, (err, result) => {
        if(err) {
            res.json({
                success: false,
                message: 'Failed to save message',
                err: err
            })
        }
        else {
            res.json({
                success: true
            });
        }
    });
});

module.exports = router;
