const { Schema, model } = require("mongoose");

const NovedadesSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    lowercase: true
  }
});
const Novedades = model("Novedades", NovedadesSchema);

module.exports = Novedades;
