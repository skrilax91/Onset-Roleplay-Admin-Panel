var config = require('../../config.json');
module.exports.index = async ( req, res, next ) => {

    var players = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM accounts', ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results || {} );
        })
    });

    var banned = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM bans', ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results || {} );
        })
    });

    res.render( "index", {
        title: config.name + " | Dashboard",
        players: players,
        banned: banned

    });
};