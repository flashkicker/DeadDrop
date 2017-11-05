const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const userRepo = require('../models/user.js');

// /POST
// user/register (with JSON object sent in body)
router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userRepo.createUser(username, password, (err, result) => {
        if(err) {
            res.status(err.status || 500).json(err);
        }
        else {
            res.status(200).send();
        }
    });
});

router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userRepo.getUser(username, (err, result) => {
        if(err) {
            res.send(err);
        }
        else{
            if(result.length == 0) {
                res.send("This username does not exist");
            }
            else {
                bcrypt.compare(password, result[0].password, (err, matched) => {
                    if(err) {
                        res.send(err);
                    }
                    else {
                        if(matched) {
                            const payload = {
                                id: result[0].id
                            };
                            var token = jwt.sign(payload, 'super-secret', {
                                expiresIn: '1d' 
                            });

                            res.json({
                                status: 200,
                                token: token
                            });
                        }
                        else {
                            res.send('Incorrect password');
                        }
                    }
                })
            }
        }        
    })
})

module.exports = router;