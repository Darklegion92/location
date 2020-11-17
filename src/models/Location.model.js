const { Schema, model } = require('mongoose')

const locationSchema = new Schema({
  idUsuario: {
    type: String,
    required: true
  },
  idVisita: {
    type: String,
    required: true
  },
  tipo: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  }
})
const Location = model('Location', locationSchema)

module.exports = Location
