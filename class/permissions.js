module.exports.permissions = ( rank ) => {
    return function( req, res, next ) {
        if( !req.isAccred( rank ) ){ 
            res.redirect('/login/')
            return;
        }

        next();
    }
}