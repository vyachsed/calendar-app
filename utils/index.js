const crypto = require('crypto');

exports.createHash = (text = Math.random(1000*1000*1000)) => {
	return crypto.createHmac('sha1', ""+process.env.SECRET_KEY).update(""+text).digest('hex');
}
exports.generatePassword = (len)=>{
    var length = len || 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}