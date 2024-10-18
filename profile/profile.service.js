const profileModel = require('../models/profile.model');

exports.create = (profile) => {
    const newProfile = new profileModel(profile);
    return newProfile.save();
};

exports.getById = async (userID) => {
    console.log('Looking up profile by userID:', userID);
    
    const profile = await profileModel.findOne({ userID });  // Make sure this is querying correctly
    
    if (!profile) {
        throw new Error('Profile not found');
    }

    return profile;
};




exports.update = (id, profile) => {
    return profileModel.findByIdAndUpdate(id, profile, { new: true });
};

/**
 * Sample request body to test the create method
 * {
 *     "userID": "1234567890",
 *     "name": "John Doe",
 *     "phoneNumber": "1234567890",
 *     "nationality": "American",
 *     "preferredLanguage": "English",
 *     "areasOfInterest": ["Sports", "Music"],
 *     "id": "1234567890",
 *     "profilePicture": "https://example.com/profile-picture.jpg"
 * }
 */

