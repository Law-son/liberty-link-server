const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;

function signUp(req, res, next) {
    userService.signUp(req.body)
        .then(user => res.json(user))
        .catch(err => {
            res.status(400).json({ message: err.message });
            next(err);
        });
}

function login(req, res, next) {
    userService.login(req.body)
        .then(user => res.json(user))
        .catch(err => {
            res.status(401).json({ message: 'Invalid email or password' });
            next(err);
        });
}

