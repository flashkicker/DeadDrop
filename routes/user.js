const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const userRepo = require('../models/user.js');

// /POST
// user/register (with JSON object sent in body)
router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userRepo.getUser(username, (err, result) => {
        if(err) {
            res.send(err);
        }
        
        if(result.length == 0) {
            userRepo.createUser(username, password, (err, result) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.json({
                        success: true
                    });
                }
            });
        }
        else {
            res.json({
                success: false,
                message: 'This username already exists'
            });
        }
    })
});


// /POST
// /user/login (with JSON object sent in body)
router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userRepo.getUser(username, (err, result) => {
        if(err) {
            res.send(err);
        }
        else{
            if(result.length == 0) {
                res.json({
                    success: false,
                    message: 'This username does not exist'
                })
            }
            else {
                bcrypt.compare(password, result[0].password, (err, matched) => {
                    if(err) {
                        res.send(err);
                    }
                    else {
                        if(matched) {
                            var token = userRepo.generateAuthToken(result);
                            res.json({
                                success: true,
                                token: token
                            });
                        }
                        else {
                            res.json({
                                success: false,
                                message: 'Incorrect password'
                            })
                        }
                    }
                })
            }
        }        
    })
})

module.exports = router;