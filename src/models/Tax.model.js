const { Schema, model } = require('mongoose')

const taxSchema = new Schema({
  Id: {
    type: String
  },
  TaxType: {
    type: String
  },
  Percentage: {
    type: String
  },
  Description: {
    type: String
  },
  SubType: {
    type: String
  }
})
const Tax = model('taxes', taxSchema)

module.exports = Tax
