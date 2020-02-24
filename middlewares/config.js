var config = require('../config.json');

module.exports = async ( req, res, next ) => {
    res.locals.config = config;
    next();
}