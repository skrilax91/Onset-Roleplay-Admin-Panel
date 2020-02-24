module.exports = async ( req, res, next ) => {
    if( req.session.auth == null && req.cookies['ADT_connect_token'] != null ){
        database.query( "SELECT * FROM users WHERE login_token = ?", [ req.cookies['ADT_connect_token'] ], ( err, results ) => {
            if( results && results.length > 0 ){
                req.session.auth = results[0];

                database.query( 'SELECT * FROM accounts WHERE steamid = ?', [req.session.auth.steamid], ( err, results ) => {
                    if( err ){ reject(); throw err };
                    req.session.auth.api = results[0];
                    next();
                })
            } else {
                next();
            }
        })
    } else {
        if( req.session.auth != null ){
            database.query( "SELECT * FROM users WHERE id = ?", [ req.session.auth.id ], ( err, results ) => {
                if( results && results.length > 0 ){
                    req.session.auth = results[0];
                    database.query( 'SELECT * FROM accounts WHERE steamid = ?', [req.session.auth.steamid], ( err, results ) => {
                        if( err ){ reject(); throw err };
                        req.session.auth.api = results[0];
                        next();
                    })
                } else {
                    next();
                }
            })
        } else {
            next();
        }
    }
}