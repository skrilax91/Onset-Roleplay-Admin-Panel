module.exports.validPost = function( req ){
    if( req == null || req == "" ){
        return false;
    }

    return true;
};