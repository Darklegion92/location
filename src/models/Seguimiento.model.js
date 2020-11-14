const { Schema, model } = require('mongoose')

const SeguimientosSchema = new Schema({
  Latitude: {
    type: String
  },
  Fecha: {
    type: Date
  },
  Longitude: {
    type: String
  },
  Identification: {
    type: String
  }
})
const Seguimiento = model('Seguimientos', SeguimientosSchema)

module.exports = Seguimiento
