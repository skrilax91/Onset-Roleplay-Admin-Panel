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