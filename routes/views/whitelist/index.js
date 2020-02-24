var config = require('../../../config.json');
module.exports.whitelist_index = async ( req, res, next ) => {
    
    var whitelist = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM whitelist ORDER BY id', ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results || {} );
        })
    });

    res.render( "whitelist/index", {
        title: config.name + " | Whitelist",
        whitelist: whitelist
    });

    
};

module.exports.whitelist_remove = async ( req, res, next ) => {
    id = req.params.id;
    var whitelist = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM whitelist WHERE id = ?', [ id ], ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results[0] || {} );
        })
    });

    if( whitelist.length < 1 ){
        req.flash('error', "Cette whitelist n'existe pas !");
        res.reload();
        return;
    }

    database.query('DELETE FROM whitelist WHERE id = ?', [id] );
    req.flash('success', "whitelist révoqué pour "+whitelist.steamid);
    res.reload();

    
};

module.exports.whitelist_add = async ( req, res, next ) => {
    var steamid = req.body.steamid;

    if( !app.validPost( steamid ) ){
        req.flash('danger', "Steamid invalide.");
        res.reload();
        return;
    }

    var whitelist = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM whitelist WHERE steamid = ?', [ steamid ], ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results[0] || {} );
        })
    });

    if( whitelist.length > 0 ){
        req.flash('error', "Ce steamID est déjà whitelist !");
        res.reload();
        return;
    }

    database.query('INSERT INTO whitelist(steamid) VALUES(?)', [steamid], ( err, result ) => {
        if( err ) throw err;
        req.flash('success', "whitelist créé créer avec succès.");
        res.reload();
    })

};