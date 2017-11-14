//This file will contain service methods like readMessage() and saveMessage()
//Methods from this file will use functions from utility.js and datarepo.js

const express = require('express');
const router = express.Router();
const messageRepo = require('../models/message.js');
var authenticate = require('./authenticate');

// /POST
// api/message (with JSON object sent in body)
router.post('/message/', authenticate, (req, res) => {
    var latitude = req.body.data.message.latitude;
    var longitude = req.body.data.message.longitude;
    var timestamp = req.body.data.message.timestamp;
    var message = req.body.data.message.message;
    var creator_id = req.decoded.id;
    var creator_username = req.decoded.username;
    
    latitude = parseFloat(latitude).toFixed(6);
    longitude = parseFloat(longitude).toFixed(6);

    if(isFinite(latitude) && Math.abs(latitude) <= 90 && isFinite(longitude) && Math.abs(longitude) <= 180) {
        messageRepo.saveMessage(latitude, longitude, timestamp, message, creator_id, creator_username, (err, result) => {
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
    } else {
        res.json({
            success: false,
            message: 'Invalid coordinates'
        });
    }
});

// /GET
// api/message?latitude={latitude}&longitude={longitude}&range={range}
router.get('/message/', (req, res) => {
    var latitudeParam = req.query.latitude;
    var longitudeParam = req.query.longitude;
    var rangeParam = req.query.range;
    
    var latitude = parseFloat(latitudeParam);
    var longitude = parseFloat(longitudeParam);
    var range = parseFloat(rangeParam);
    
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

// /GET
// api/message/user (token should be provided in the header)
router.get('/message/user', authenticate, (req, res) => {
    var creator_id = req.decoded.id;

    messageRepo.getMessagesById(creator_id, (err, result) => {
        if(err) {
            res.json({
                success: false,
                err: err
            });
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

router.patch('/message', authenticate, (req, res) => {
    var message_id = req.body.message_id;
    var message = req.body.message;

    messageRepo.editMessage(message, message_id, (err, result) => {
        if(err) {
            res.json({
                success: false,
                err: err
            });
        }
        else {
            res.json({
                success: true
            });
        }
    });
});

// /DELETE
// api/message (token should be provided in the header)
router.delete('/message', authenticate, (req, res) => {
    var message_id = req.body.message_id;

    messageRepo.deleteMessage(message_id, (err, result) => {
        if(err) {
            res.json({
                success: false,
                err: err
            });
        }
        else {
            res.json({
                success: true
            });
        }
    });
});

module.exports = router;
