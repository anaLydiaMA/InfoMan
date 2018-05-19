// Load the Cloudant library.
require('dotenv').load();
var Cloudant = require('cloudant');
var cfenv = require("cfenv");

var cloudant;
if (process.env.NODE_ENV == 'test') {
  // Initialize the library with cloudant account.
  cloudant = Cloudant({
    account: process.env.CLOUDANT_USERNAME,
    password: process.env.CLOUDANT_PASSWORD
  });

} else {
  var appEnv = cfenv.getAppEnv();
  var DB_PROD_CRED = appEnv.getServiceCreds(process.env.CLOUDANT_SERVICE_NAME);
  cloudant = Cloudant({
    account: DB_PROD_CRED.username,
    password: DB_PROD_CRED.password
  });
}

// Set database to use.


module.exports.cloudant = cloudant;
