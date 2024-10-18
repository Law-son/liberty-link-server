const { expressjwt } = require('express-jwt');
const config = require('config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/users/signup',
            '/users/login',
            { url: /\/profile\/fetch\/.*/, methods: ['GET'] }, // Skip authentication for GET requests to /profile/fetch
            { url: /\/profile\/update\/.*/, methods: ['PUT'] },
            { url: '/profile/create', methods: ['POST'] },
        ]
    });
}

