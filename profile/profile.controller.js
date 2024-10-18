const express = require('express');
const router = express.Router();
const profileService = require('./profile.service');

// routes
router.post('/create', createProfile);
router.get('/fetch/:id', getProfileById);
router.put('/update/:id', updateProfile);

module.exports = router;

function createProfile(req, res, next) {
    profileService.create(req.body)
        .then(profile => res.json(profile))
        .catch(err => {
            res.status(400).json({ message: err.message });
            next(err);
        });
}

function getProfileById(req, res, next) {
    const userID = req.params.id;  // Ensure userID is passed via URL params
    console.log('Fetching profile with userID:', userID);

    profileService.getById(userID)
        .then(profile => {
            if (!profile) {
                console.log('Profile not found');
                return res.status(404).json({ message: 'Profile not found' });
            }
            console.log('Profile found:', profile);
            res.json(profile);  // Send the profile back as a JSON response
        })
        .catch(err => {
            console.log('Error fetching profile:', err.message);
            res.status(500).json({ message: err.message });
            next(err);
        });
}



function updateProfile(req, res, next) {
    profileService.update(req.params.id, req.body)
        .then(profile => res.json(profile))
        .catch(err => {
            res.status(400).json({ message: err.message });
            next(err);
        });
}


