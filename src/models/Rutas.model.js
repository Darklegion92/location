const { Schema, model } = require("mongoose");

const RutasSchema = new Schema({
  documento: {
    type: String,
    required: true,
    lowercase: true
  },
  telefono: {
    type: String,
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
  idSIIGO: {
    type: Number,
    required: true
  },
  direccion: {
    type: String,
    required: true,
    lowercase: true
  },
  creado: {
    type: Date,
    default: Date.now()
  },
  diaSemana:{
    type:Number
  }
});
const Rutas = model("Rutas", RutasSchema);

module.exports = Rutas;
