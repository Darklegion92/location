const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  idUsuario: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  }
});
const Location = model("Location", locationSchema);

module.exports = Location;
