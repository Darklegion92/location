const { Schema, model } = require('mongoose')

const ClientesSchema = new Schema({
  IdSiigo: {
    type: Number,
    required: true,
    unique: true
  },
  IsSocialReason: {
    type: Boolean,
    required: true
  },
  FullName: {
    type: String
  },
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Identification: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Phone: { type: Object, required: true },
  CodeContact: {
    type: Number,
    required: true
  },
  Phone1: { type: Object, required: true },
  EMail: { type: String }
})
const Cliente = model('Clientes', ClientesSchema)

module.exports = Cliente
