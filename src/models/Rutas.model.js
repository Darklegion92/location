const { Schema, model } = require("mongoose");

const RutasSchema = new Schema({
  documento: {
    type: String,
    required: true,
    lowercase: true
  },
  telefono: {
    type: String,
    required: true,
    lowercase: true
  },
  nombre: {
    type: String,
    required: true,
    lowercase: true
  },
  idUsuario: {
    type: String,
    required: true
  },
  idTNS: {
    type: Number,
    required: true
  },
  direccion: {
    type: String,
    required: true,
    lowercase: true
  },
  barrio: {
    type: String,
    required: true,
    lowercase: true,
    default: "sin barrio"
  },
  ultVisita: {
    type: Date
  },
  creado: {
    type: Date,
    default: Date.now()
  }
});
const Rutas = model("Rutas", RutasSchema);

module.exports = Rutas;
