var express = require('express');
const favicon = require('express-favicon');
var bodyPareser = require('body-parser');
var path = require('path');
var config = require('./config.json');
var call = require('./secret.json');

/* Load MYSQL */
require('./class/mysql');

// Initilize globals
global.__basedir = __dirname;
global.config = config;
global.app = require('./class/app');

// Load modules
var session = require('express-session');
var cookieParser = require('cookie-parser');
var steam = require('steam-login');
var requestIp = require('request-ip');
var request = require('request');

var server = express();
server.use(favicon("assets/img/favicon.png"));

var http = require('http').createServer( server );

// Moteur de template
server.set( 'view engine', 'ejs' );
server.disable( 'x-powered-by' );
server.set('trust proxy', true);

// Middleware
server.use( '/assets', express.static('assets') )
server.use( bodyPareser.urlencoded( { extended: false } ) );
server.use( bodyPareser.json() );
server.set( 'views', [ path.join( __dirname, 'views'), path.join( __dirname, 'views/inc/' ) ]);
server.use( requestIp.mw() )
server.use( cookieParser() );
server.use( session({
    secret: call.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
server.use( steam.middleware({
    realm: call.steam.realm, 
    verify: call.steam.verify,
    apiKey: call.steam.apiKey
}));
server.use( require('./middlewares/config') );
server.use( require('./middlewares/auto_connect') );
server.use( require('./middlewares/update_user') );
server.use( require('./middlewares/user') );
server.use( require('./middlewares/maintenance') );

// Routes
server.use( '/', require('./routes/index') );

// Catch 404
server.use( ( req, res, next ) => {
    const err = new Error( "Page introuvable" );

    err.status = 404;
    err.msg = "La page que vous avez demandée n'existe pas.";
    
    next( err )
})

// Catch errors
server.use( ( err, req, res, next ) => {
    res.locals.error = err

    res.locals.title = config.name + " | Erreur"
    res.locals.error.status = err.status || 500
    res.locals.error.msg = err.msg || null

    if( err.status != 404 ){
        console.log( err )
    }

    res.status( err.status || 500 )
    res.render( 'error' )
})

// https.listen( 443 );
http.listen( config.port );

console.log('Server started')