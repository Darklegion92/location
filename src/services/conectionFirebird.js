const CONFIG = require("../config/config");
const Firebird = require("node-firebird");

module.exports = (user, password, callback) => {
  var options = {};
  options.host = CONFIG.IP;
  options.port = CONFIG.PORT_DB;
  options.database = CONFIG.DB_FIREBIRD;
  options.user = user;
  options.password = password;
  options.lowercase_keys = false; // set to true to lowercase keys
  options.role = null; // default
  options.pageSize = 4096; // default when creating databas

  Firebird.attach(options, async (err, db) => {
    return callback(err, db);
  });
};
