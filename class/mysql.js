var mysql = require('mysql');
var config = require('../secret.json');

var database;

function handleDisconnect() {
    database = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    });

    database.connect( function(err) {
        if(err) {
            console.log('error when connecting to db:', err)
            setTimeout(handleDisconnect, 2000);
        }
    });

    database.on('error', function(err) {
        console.log('db error', err);

        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    global.database = database
}

handleDisconnect();