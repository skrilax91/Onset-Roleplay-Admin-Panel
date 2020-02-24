var config = require('../../config.json');
module.exports.maintenance = async ( req, res, next ) => {
    if (!config.hostConfig.maintenance) {
        res.redirect("/");
        return;
    }

    res.render( "maintenance", {
        title: "Intranet | Maintenance"
    } );
};