const { Schema, model } = require('mongoose')

const FacturasSchema = new Schema({
  Header: Object,
  Items: Array,
  Payments: Object,
  Extras: Object
})
const Factura = model('Facturas', FacturasSchema)

module.exports = Factura
