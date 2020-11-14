const { Schema, model } = require('mongoose')

const FacturasSchema = new Schema({
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
const Factura = model('Facturas', FacturasSchema)

module.exports = Factura
