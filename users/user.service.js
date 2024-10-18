const crypto = require('crypto');
const config = require('config.json');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports = {
    signUp,
    login
};

async function signUp({ email, password }) {
    const user = await userModel.findOne({ email });

    if (user) throw 'Email already exists.';

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    const newUser = new userModel({ email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ sub: newUser._id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(newUser),
        token
    };
}


async function login({ email, password }) {
    const user = await userModel.findOne({ email });

    if (!user) throw 'Invalid email or password.';

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    if (user.password !== hashedPassword) throw 'Invalid email or password.';

    const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}


function omitPassword(user) {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
}


