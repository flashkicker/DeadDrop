const jwt = require('jsonwebtoken');
var userRepo = require('../models/user.js');

var authenticate = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-auth'];
    
    if(token) {
        jwt.verify(token, 'super-secret', (err, decoded) => {
            if(err) {
                return res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });   
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}

module.exports = authenticate;