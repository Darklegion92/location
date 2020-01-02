module.exports = {
    PORT: process.env.PORT || 3001,
    DB_FIREBIRD: process.env.FIREBIRD_URI || 'D:\\SYSplus\\Datos\\PRU\\sysplus.fdb',
    SECRET_TOKEN: "SOLTEC-tecnologiaydesarrollo$",
    DB_MYSQL: process.env.DB_MYSQL || "localhost",
    PORT_DB_FIREBIRD: process.env.PORT_DB_FIREBIRD || 3050,
    USER_MYSQL: process.env.USER_MYSQL || 'root',
    PASS_MYSQL: process.env.PASS_MYSQL || '1234',
    NAME_MYSQL: process.env.NAME_MYSQL || 'domiciliossfc',
}