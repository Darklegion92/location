module.exports = {
  PORT: process.env.PORT || 3005,
  DB_FIREBIRD:
    process.env.FIREBIRD_URI || "D:/TNS/TNS.GDB",
  SECRET_TOKEN: "SOLTEC-tecnologiaydesarrollo$",
  DB_MONGO: process.env.DB_MOMGO || "mongodb://localhost:27017/geolocalizacion",
  PORT_DB_FIREBIRD: process.env.PORT_DB_FIREBIRD || 3050,
  USER_MONGO: process.env.USER_MYSQL || "root",
  PASS_MONGO: process.env.PASS_MYSQL || "1234",
  NAME_MONGO: process.env.NAME_MYSQL || "geolocalizacion",
  IP: process.env.IP || "localhost",
  PORT_DB: process.env.IP || "3050",
  USER_FIREBIRD: process.env.USER_FIREBIRD || "sysdba",
  PASS_FIREBIRD: process.env.PASS_FIREBIRD || "masterkey"
};
