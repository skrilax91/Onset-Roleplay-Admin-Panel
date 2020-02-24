module.exports = async function( req, res, next ){
	if(req.isBanned() && (req.originalUrl != "/ban" && req.originalUrl != "/ban/")){
	    console.log("check group");
	    res.redirect('/ban/');
	    return;
	}else{
		next()
	}
	
}