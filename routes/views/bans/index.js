var config = require('../../../config.json');
module.exports.bans_index = async ( req, res, next ) => {
    
    var bans = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM bans ORDER BY id', ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results || {} );
        })
    });

    res.render( "bans/index", {
        title: config.name + " | Bannissement",
        bans: bans
    });

    
};

module.exports.bans_remove = async ( req, res, next ) => {
    id = req.params.id;
    var ban = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM bans WHERE id = ?', [ id ], ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results[0] || {} );
        })
    });

    if( ban.length < 1 ){
        req.flash('error', "Ce bannissement n'existe pas !");
        res.redirect('/bans/')
        return;
    }

    database.query('DELETE FROM bans WHERE id = ?', [id] );
    req.flash('success', "Ban révoqué");
    res.redirect('/bans/');

    
};

module.exports.bans_add = async ( req, res, next ) => {
    var steamid = req.body.steamid;
    var time = req.body.time;
    var reason = req.body.reason;

    if( !app.validPost( steamid ) ){
        req.flash('danger', "Steamid invalide.");
        res.reload();
        return;
    }

    if( !app.validPost( time ) ){
        time = "0";
    }

    if(reason.length > 128 ){
        req.flash('danger', "La raison ne doit pas dépasser 128 lettres");
        res.reload();
        return;
    }

    var ban = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM bans WHERE steamid = ?', [ steamid ], ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results[0] || {} );
        })
    });

    if( ban.length > 0 ){
        req.flash('error', "Ce steamID est déjà banni !");
        res.reload();
        return;
    }

    database.query('INSERT INTO bans(steamid, ban_time, reason) VALUES(?, ?, ?)', [steamid, time, reason], ( err, result ) => {
        if( err ) throw err;
        req.flash('success', "ban créé créer avec succès.");
        res.reload();
    })

};

module.exports.bans_remove = async ( req, res, next ) => {
    id = req.params.id;
    var ban = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM bans WHERE id = ?', [ id ], ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results[0] || {} );
        })
    });

    if( ban.length < 1 ){
        req.flash('error', "Ce bannissement n'existe pas !");
        res.reload();
        return;
    }

    database.query('DELETE FROM bans WHERE id = ?', [id] );
    req.flash('success', "Ban révoqué");
    res.reload();

    
};