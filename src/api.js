const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const articulosRouter = require("./routes/Articulo.routes")
const agrupacionesRouter = require("./routes/Agrupaciones.routes")
const slidersRouter = require("./routes/Slider.routes")
const seccionesRouter = require("./routes/Seccion.routes")
const datosRouter = require("./routes/Datos.routes")
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
APP.use('/articulos',articulosRouter)
APP.use('/agrupaciones',agrupacionesRouter)
APP.use('/slider',slidersRouter)
APP.use('/secciones',seccionesRouter)
APP.use('/datos',datosRouter)

//Elementos Estaticos
APP.use(express.static("public"));
module.exports = APP;
