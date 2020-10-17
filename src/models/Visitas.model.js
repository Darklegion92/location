const { Schema, model } = require("mongoose");

const visitasSchema = new Schema({
  idUsuario: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  efectiva:{
    type:Boolean,
    required:true,
    default:false
  },
  documentoCliente:{
    type:String,
    required:true,
  },
  fullName:{
    type:String,
    required:true,
  },
  direccion:{
    type:String,
    required:true,
  },
  telefono:{
    type:String,
    required:true,
  },
  novedad:{
    type:String,
    required:false,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: new Date(),
    required: true,
  },
});
const Visitas = model("Visitas", visitasSchema);

module.exports = Visitas;
