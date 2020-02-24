var config = require('../config.json');
module.exports = async ( req, res, next ) => {
    if( req.session.auth == null ){ next(); return; }

    if( req.session.auth.settings ){

    } else {
    	database.query('UPDATE `users` SET `settings` = ? WHERE `id` = ?', [JSON.stringify(config.defaultSettings), req.session.auth.id] )
    	req.session.auth.settings = config.defaultSettings;
    }
    next();
}