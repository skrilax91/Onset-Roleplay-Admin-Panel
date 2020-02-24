module.exports = async function( req, res, next ){
	if(req.isLogin() && req.session.auth.state == 0 && (req.originalUrl != "/register" || req.originalUrl != "/register/")){
	    console.log("check register");
	    res.redirect('/register/');
	}
	next()
}