const { Schema, model } = require('mongoose')

const novedadesVisitaSchema = new Schema({
  idUsuario: {
    type: String,
    required: true
  },
  DocDate: {
    type: Date
  },
  FullName: {
    type: String
  },
  Address: {
    type: String
  },
  Phone: {
    type: Object
  },
  Identification: {
    type: String
  },
  IdNovedad: {
    type: String
  },
  NombreNovedad: {
    type: String
  }
})
const NovedadVisita = model('NovedadVisita', novedadesVisitaSchema)

module.exports = NovedadVisita
