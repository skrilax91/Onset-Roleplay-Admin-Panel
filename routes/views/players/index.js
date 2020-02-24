var config = require('../../../config.json');
module.exports.players_index = async ( req, res, next ) => {
    
    var users = await new Promise( ( resolve, reject ) => {
        database.query( 'SELECT * FROM accounts ORDER BY id', ( err, results ) => {
            if( err ){ reject(); throw err };

            resolve( results || {} );
        })
    });

    res.render( "players/index", {
        title: config.name + " | Joueurs",
        users: users
    });

    
};