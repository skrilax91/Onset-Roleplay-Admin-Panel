var config = require('../config.json');
var fs = require('fs');

module.exports = async function( req, res, next ){
    res.locals.user = {}
    
    if( req.session.auth ){
        res.locals.user.auth = req.session.auth
    }
    
    req.flash = function( type, content ) {
        if( req.session.flash == undefined ){
            req.session.flash = {}
        }

        req.session.flash.ftype = type
        req.session.flash.fcontent = content
    }

    req.isLogin = function(){
        if( req.session.auth == null ){
            return false;
        }

        return true;        
    }

    req.isBanned = function( group ){
        if( !req.isLogin() ){ return false; }

        if( req.session.auth.state == 2 ){ return true; }

        return false;        
    }

    req.getSettings = function(){
        if( req.session.auth == null ){
            return false;
        }
        var settings = JSON.parse( req.session.auth.settings );
        return settings;
    }

    req.isGroup = function( group ){
        if( !req.isLogin() ){ return false; }
        if( req.session.auth.api.adaclevel == group ){ return true; }
        return false;        
    }

    req.isAdmin = function( group ){
        if( !req.isLogin() ){ return false; }
        return req.session.auth.admin;
        return false;
    }

    req.isEM = function(){
        if( !req.isLogin() ){ return false; }
        if( req.isAdmin()){ return true; }
        var settings = JSON.parse( req.session.auth.settings );
        if(settings.EM){ return true; }
        return false;
    }

    req.isRH = function(){
        if( !req.isLogin() ){ return false; }
        if( req.isAdmin() || req.isEM()){ return true; }
        var settings = JSON.parse( req.session.auth.settings );
        if(settings.RH){ return true; }
        return false;
    }

    req.checkPerm = function(section, perm){
        if( !req.isLogin() ){ return false; }
        if( req.isAdmin()){ return true; }
        var settings = JSON.parse( req.session.auth.settings );
        if(settings[section][perm]){ return true; }
        return false;
    }

    req.isAccred = function( group ){
        if( !req.isLogin() ){ return false; }
        if( req.isAdmin()){ return true; }
        if( req.session.auth.api.admin >= group ){ return true; }
        return false;
    }

    req.getId = function(){
        if( !req.isLogin() ){ return 0; };
        return req.session.auth.id;
    }

    // Responses
    res.locals.user.isLogin = function(){
        if( res.locals.user.auth == null ){
            return false
        }

        return true;        
    }

    res.locals.user.isBanned = function( group ){
        if( !req.isLogin() ){ return false; }

        if( req.session.auth.state == 2 ){ return true; }

        return false;        
    }

    res.locals.user.getSettings = function(){
        if( res.locals.user.auth == null ){
            return false
        }
        var settings = JSON.parse( res.locals.user.auth.settings );
        return settings;

    }

    res.locals.user.isGroup = function( group ){
        if( !req.isLogin() ){ return false; }
        if( res.locals.user.auth.api.adaclevel == group ){ return true; }
        return false;        
    }

    res.locals.user.isAdmin = function( group ){
        if( !req.isLogin() ){ return false; }
        return res.locals.user.auth.admin;     
    }

    res.locals.user.isEM = function(){
        if( !res.locals.user.isLogin() ){ return false; }
        if( req.isAdmin()){ return true; }
        var settings = JSON.parse( res.locals.user.auth.settings );
        if(settings.EM){ return true; }
        return false;
    }

    res.locals.user.isRH = function(){
        if( !req.isLogin() ){ return false; }
        if( req.isAdmin() || req.isEM()){ return true; }
        var settings = JSON.parse( res.locals.user.auth.settings );
        if(settings.RH){ return true; }
        return false;
    }

    res.locals.user.checkPerm = function(section, perm){
        if( !req.isLogin() ){ return false; }
        if( req.isAdmin()){ return true; }
        var settings = JSON.parse( res.locals.user.auth.settings );
        if(settings[section][perm]){ return true; }
        return false;
    }

     res.locals.user.isAccred = function( group ){
        if( !req.isLogin() ){ return false; }
        if( req.isAdmin()){ return true; }
        if( req.session.auth.api.adaclevel >= group ){ return true; }

        return false;
    }

    res.locals.hasFlash = function(){
        if(req.session.flash){ return true; };
        return false;
    }

    res.locals.launchFlash = function(){
        var flash = {};
        flash.type = req.session.flash.ftype
        flash.content = req.session.flash.fcontent
        req.session.flash = undefined

        return flash;
    }

    res.locals.user.getId = function(){
        if( !req.isLogin() ){ return 0; };

        return res.locals.user.auth.id;
    }

    res.reload = function(){
        var url = req.get('referer');

        if( url == undefined ){ url = "/"; };

        res.redirect( url );
    }
    
    next()
}