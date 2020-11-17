const { Schema, model } = require('mongoose')

const OrdenesSchema = new Schema({
  Items: {
    type: Array
  },
  DocDate: {
    type: Date
  },
  FullName: {
    type: String
  },
  Total: {
    type: Number
  },
  Identification: {
    type: String
  },
  Estado: {
    type: String,
    default: 'Pendiente'
  },
  idUsuario: { type: String }
})
const Ordene = model('Ordenes', OrdenesSchema)

module.exports = Ordene
