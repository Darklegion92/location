const { Schema, model } = require("mongoose");

const RutasSchema = new Schema({
  documento: {
    type: String,
    required: true,
    lowercase: true
  },
  cartera: {
    type: Array
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  },
  novedad: {
    type: Boolean,
    required: true,
    default: false
  },
  idNovedad: {
    type: String,
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
  visitado: {
    type: Boolean,
    default: false
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
