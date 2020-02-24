module.exports = async ( req, res, next ) => {
    if( req.session.auth == null ){ next(); return; }
    
    var id = req.session.auth.id;
    
    database.query('UPDATE `users` SET `last_connection` = NOW() WHERE `id` = ?', [id] )
    
    next();
}