const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const usauriosRouter = require("./routes/Usuarios.routes");
const locationRouter = require("./routes/Location.routes");
const rutasRouter = require("./routes/Rutas.routes");
const clientesRouter = require("./routes/Clientes.routes");
const novedadesRouter = require("./routes/Novedades.routes");
const articulosRouter = require("./routes/Articulos.routes");

const CONFIG = require("./config/config");

const APP = express();

//MiddelWare
APP.use(cors());
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(
  session({
    secret: CONFIG.SECRET_TOKEN,
    resave: true,
    saveUninitialized: true
  })
);
APP.use(morgan("dev"));

//Ruta
APP.use("/usuario", usauriosRouter);
APP.use("/location", locationRouter);
APP.use("/rutas", rutasRouter);
APP.use("/clientes", clientesRouter);
APP.use("/novedades", novedadesRouter);
APP.use("/articulos", articulosRouter);

//Elementos Estaticos
APP.use(express.static("public"));
module.exports = APP;
