var express = require('express');
var router = express.Router();

const { catchErrors } = require('../class/errorHandlers.js');
const { permissions } = require('../class/permissions.js');
var { maintenance } = require('./views/maintenance');
var { index } = require('./views/index');
var { login, login_verify, logout } = require('./views/login');
var { players_index} = require('./views/players/index');
var { bans_index, bans_add, bans_remove} = require('./views/bans/index');
var { whitelist_index, whitelist_add, whitelist_remove} = require('./views/whitelist/index');

// Homes pages
router.get( '/', permissions(1), catchErrors( index ) );
router.get( '/maintenance/', catchErrors( maintenance ) );

// Login pages
router.get( '/login/', login );
router.get( '/verify/', login_verify );
router.get( '/logout/', logout );

// players pages
router.get( '/players/', permissions(1), catchErrors( players_index ));

// bans pages
router.get( '/bans/', permissions(1), catchErrors( bans_index ));
router.post( '/bans/add/', permissions(1), catchErrors( bans_add ));
router.get( '/bans/remove/:id', permissions(1), catchErrors( bans_remove ));

// Whitelist pages
router.get( '/whitelist/', permissions(1), catchErrors( whitelist_index ));
router.post( '/whitelist/add/', permissions(1), catchErrors( whitelist_add ));
router.get( '/whitelist/remove/:id', permissions(1), catchErrors( whitelist_remove ));

module.exports = router;