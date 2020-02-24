var express = require('express');
var router = express.Router();

const { catchErrors } = require('../class/errorHandlers.js');
const { permissions } = require('../class/permissions.js');
var { maintenance } = require('./views/maintenance');
var { index } = require('./views/index');
var { login, login_verify, logout } = require('./views/login');
var { players_index} = require('./views/players/index');

// Homes pages
router.get( '/', permissions(1), catchErrors( index ) );
router.get( '/maintenance/', catchErrors( maintenance ) );

// Login pages
router.get( '/login/', login );
router.get( '/verify/', login_verify );
router.get( '/logout/', logout );

// players pages
router.get( '/players/', permissions(1), catchErrors( players_index ));

module.exports = router;