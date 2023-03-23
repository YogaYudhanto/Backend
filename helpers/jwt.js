const jwt = require ('jsonwebtoken');

function generateJWT(payload) {
    return jwt.sign(payload, process.env.SECRETKEY);
}

function validateJWT(token) {
    return jwt.verify(token, process.env.SECRETKEY);
}

module.exports = {generateJWT, validateJWT}