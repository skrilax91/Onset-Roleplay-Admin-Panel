var steam = require('steam-login');
var randtoken = require('rand-token');
const request = require('request');
var config = require('../../config.json');

module.exports.login = [ steam.authenticate(), ( req, res, next ) => {
    res.redirect('/');
}]


module.exports.login_verify = [ steam.verify(), ( req, res, next ) => {
    
	
	if( req.isLogin() ){
        res.redirect( '/' );
        return;
    }

    if( req.isGroup(-1) ){
        res.redirect( '/' );
        return;
    }
    req.session.auth = req.user;
    var steamid = req.session.auth.steamid;

    var user = new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM accounts WHERE steamid = ?', [steamid], ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results || {} );
        })
    });
    if(user.length < 1) {
        req.session.auth = null;
        req.user = null;
        res.redirect( '/' );
        return;
    }
    if (user.admin == 0) {
        req.session.auth = null;
        req.user = null;
        res.redirect( '/' );
        return;
    }

    database.query('SELECT * FROM users WHERE steamid = ?', [ steamid ], ( err, result ) => {
        if( result.length < 1 ){
            var avatar = req.session.auth.avatar.large
            database.query('INSERT INTO users( steamid, avatar, join_at, settings) VALUES( ?, ?, NOW(), ?)', [ steamid, avatar, JSON.stringify(config.defaultSettings)], ( err, result_ ) => {
                if (err) {
                    console.log(err);
                }
            })
            req.session.auth = null;
            req.user = null;
            req.flash('success', "Config créés, veuillez vous reconnecter");
            res.redirect( '/' );
            
            return;
        }

        if (err) {
            console.log(err);
        }

        var token = randtoken.generate(200);
        console.log(result.length)

        req.session.auth = result[0];

        var expires = new Date();
        expires.setTime( expires.getTime() + ( 365 * 24 * 60 * 60 * 1000 ) );

        res.cookie( "ADMIN_connect_token", token, { expires: expires }, );

        database.query('UPDATE users SET login_token = ? WHERE id = ?', [ token, req.session.auth.id ] );

        req.flash('success', "Vous êtes bien connecté");
        res.redirect( '/' );
        return;
    })

    
}];

module.exports.logout = ( req, res, next ) => {
    res.clearCookie( "ADMIN_connect_token" ); 
    req.session.auth = null;
    req.user = null;

    res.redirect('/');
};