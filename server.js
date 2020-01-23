const CONFIG = require("./src/config/config");
const DB = require("./src/services/conexionMongoDB");
const APP = require("./src/api");
DB.connect();
APP.listen(CONFIG.PORT, err => {
  if (err) return console.log(err);
  console.log(`Servidor En El Puerto ${CONFIG.PORT}`);
});
