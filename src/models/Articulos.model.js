const { Schema, model } = require('mongoose')

const ArticulosSchema = new Schema({
  Id: {
    type: Number,
    unique: true
  },
  Code: {
    type: String,
    lowercase: true
  },
  Description: {
    type: String,
    lowercase: true
  },
  ReferenceManufactures: {
    type: String,
    lowercase: true
  },
  ProductTypeKey: {
    type: String,
    lowercase: true
  },
  CodeBars: {
    type: String,
    lowercase: true
  },
  TaxAddID: {
    type: Number
  },
  TaxDiscID: {
    type: Number
  },
  IsIncluded: { type: Boolean },
  Cost: {
    type: Number
  },
  IsInventoryControl: { type: Boolean },
  State: {
    type: Number
  },
  PriceList1: {
    type: Number
  },
  PriceList2: {
    type: Number
  },
  PriceList3: {
    type: Number
  },
  PriceList4: {
    type: Number
  },
  PriceList5: {
    type: Number
  },
  PriceList6: {
    type: Number
  },
  PriceList7: {
    type: Number
  },
  PriceList8: {
    type: Number
  },
  PriceList9: {
    type: Number
  },
  PriceList10: {
    type: Number
  },
  PriceList11: {
    type: Number
  },
  PriceList12: {
    type: Number
  },
  Image: {
    type: String,
    lowercase: true
  },
  AccountGroupID: {
    type: Number
  },
  SubType: {
    type: Number
  },
  TaxAdd2ID: {
    type: Number
  },
  TaxImpoValue: {
    type: Number
  },
  Model: {
    type: String,
    lowercase: true
  },
  Tariff: {
    type: String,
    lowercase: true
  },
  Brand: {
    type: String,
    lowercase: true
  },
  MeasurementUnitCode: {
    type: String,
    lowercase: true
  },
  Balance: {
    type: Number
  }
})
const Articulo = model('Articulos', ArticulosSchema)

module.exports = Articulo
