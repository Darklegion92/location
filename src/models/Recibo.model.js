const { Schema, model } = require('mongoose')

const RecibosSchema = new Schema({
  IdSiigo: {
    type: Number,
    required: true,
    unique: true
  },
  Number: {
    type: Number,
    required: true
  },
  ERPDocName: {
    type: String
  },
  ERPDocDate: {
    type: Date
  },
  Identification: {
    type: String
  },
  AccountName: {
    type: String,
    required: true
  },
  TotalValue: {
    type: Number,
    required: true
  },
  CountItems: { type: Number, required: true }
})
const Recibo = model('Recibos', RecibosSchema)

module.exports = Recibo
