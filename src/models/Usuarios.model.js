const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    lowercase: true
  },
  usuario: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  creado: {
    type: Date,
    default: Date.now()
  }
});
const Usuario = model("Usuarios", UsuariosSchema);

module.exports = Usuario;
