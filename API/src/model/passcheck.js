var crypto = require('crypto');
var passcheck = (function(){
  var passwords_match = function(salted_pass,unsalted_pass){
    salt = salted_pass.substring(0,32);
    resalted_pass = salt + crypto.pbkdf2Sync(unsalted_pass, salt,
                                        1000, 48, 'sha512').toString('hex');
    return resalted_pass === salted_pass;
  }
  var salt_and_hash = function(password){
    salt = crypto.randomBytes(24).toString('base64');
    return salt+crypto.pbkdf2Sync(password,salt,1000,48,"sha512").toString('hex');
  }

  return {
    'passwords_match': passwords_match,
    'salt_and_hash': salt_and_hash
  };

})();

module.exports = passcheck;
