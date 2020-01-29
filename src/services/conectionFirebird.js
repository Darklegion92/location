const CONFIG = require("../config/config");

var fb = require("node-firebird"), // firebird lib
  q = require("q"), // promises lib
  db, // this will store the global db object
  cfg; // cfg object

cfg = {
  host: CONFIG.IP,
  port: CONFIG.PORT_DB,
  database: CONFIG.DB_FIREBIRD,
  user: CONFIG.USER_FIREBIRD,
  password: CONFIG.PASS_FIREBIRD
};

/*------------------------------ UTILITY -------------------------------*/
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/*------------------------------ CONNECT/DISCONNECT -------------------------------*/
const connectToDB = function(acfg) {
  var def = q.defer();

  fb.attach(acfg, function(err, db) {
    err ? def.reject(err) : def.resolve(db);
  });
  return def.promise;
};

const disconnectFromDB = function() {
  db.detach(function() {
    console.log("database detached");
  });
};

/*------------------------------ QUERY -------------------------------*/
const queryDB = function(sql,params) {
  var def = q.defer();

  connectToDB(cfg).then(
    // success
    function(dbconn) {
      db = dbconn;
      db.query(sql, params,function(err, rs) {
        err ? def.reject(err) : def.resolve(rs);
      });
    },
    // fail
    function(err) {
      console.log(err);
    }
  );
  return def.promise;
};

module.exports = {
  queryDB,
  disconnectFromDB
};
