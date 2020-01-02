const mysql = require("mysql");
const CONFIG = require("../config/config");

const con = mysql.createConnection({
  host: CONFIG.DB_MYSQL,
  user: CONFIG.USER_MYSQL,
  password: CONFIG.PASS_MYSQL,
  database: CONFIG.NAME_MYSQL,
});

module.exports = {
  con
};
