module.exports = {
  PORT: process.env.PORT || 8085,
  DB_FIREBIRD: process.env.FIREBIRD_URI || 'D:/TNS/TNS.GDB',
  SECRET_TOKEN: 'SOLTEC-tecnologiaydesarrollo$',
  DB_MONGO: process.env.DB_MOMGO || 'mongodb://localhost:27017/geolocalizacion',
  PORT_DB_FIREBIRD: process.env.PORT_DB_FIREBIRD || 3050,
  USER_MONGO: process.env.USER_MYSQL || 'root',
  PASS_MONGO: process.env.PASS_MYSQL || '1234',
  NAME_MONGO: process.env.NAME_MYSQL || 'geolocalizacion',
  IP: process.env.IP || 'localhost',
  PORT_DB: process.env.IP || '3050',
  USER_FIREBIRD: process.env.USER_FIREBIRD || 'sysdba',
  PASS_FIREBIRD: process.env.PASS_FIREBIRD || 'masterkey',
  SIIGO_USERNAME:
    process.env.SIIGO_USERNAME ||
    'GRUPOP28651@apionmicrosoft.com' ||
    'EMPRESA2CAPACITACION\\empresa2@apionmicrosoft.com',
  SIIGO_PASSWORD:
    process.env.SIIGO_USERNAME || '%vi12m8=dM' || 's112pempresa2#',
  SIIGO_SUSCRIPTION:
    process.env.SIIGO_SUSCRIPTION ||
    'b838c206d9674e9e95b009f74e92a0e3' ||
    '1bacb007e08a41c8a17d728be643ae63',
  SIIGO_CONEXION: {
    SIIGO_USERNAME: 'GRUPOP28651@apionmicrosoft.com',
    SIIGO_PASSWORD: '%vi12m8=dM',
    SIIGO_SUSCRIPTION: 'b838c206d9674e9e95b009f74e92a0e3'
  },
  SIIGO_PARAMETROS: {
    DocCode: 45451, //codigo de la factura
    SalesmanIdentification: '963852741', //identificacion
    CityCode: '54001', //codigo de la ciudad
    StateCode: '54', //codigo del estado o departamento
    CountryCode: 'Co', //codigo del pais
    PaymentMeansCode: 9087,
    IdTypeCode: 13 //codigo del medio de pago en este caso cartera
  }
}
