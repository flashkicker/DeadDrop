const express = require('express');
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

module.exports = router;