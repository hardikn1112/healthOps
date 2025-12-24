const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Unauthorized Access');

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
}