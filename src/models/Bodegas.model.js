const { Schema, model } = require("mongoose");

const BodegasSchema = new Schema({
  Id: {
    type: Number,
    unique: true,
  },
  Code: {
    type: String,
  },
  Description: {
    type: String,
  },
  InUse: {
    type: Boolean,
  },
  Value: {
    type: Number,
  },
});
const Bodega = model("Bodegas", BodegasSchema);

module.exports = Bodega;
