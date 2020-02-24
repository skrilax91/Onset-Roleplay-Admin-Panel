var config = require('../secret.json');
module.exports = async function( req, res, next ){
	var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
	if(config.hostConfig.maintenance && (req.originalUrl != "/maintenance" && req.originalUrl != "/maintenance/")){
		if(config.hostConfig.whitelist[ip] != null){
			next()
		}else{
			res.redirect('/maintenance/');
	    	return;
		}
	    
	}else if(req.originalUrl == "/maintenance" || req.originalUrl == "/maintenance/"){
		res.redirect("/");
	}else{
		next()
	}
}