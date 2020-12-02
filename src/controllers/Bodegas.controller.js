const axios = require("axios").default;
const { SIIGO_SUSCRIPTION, SIIGO_PARAMETROS } = require("../config/config");
const Bodega = require("../models/Bodegas.model");

async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  var bodegas;
  try {
    bodegas = await Bodega.find();
    if (bodegas.length > 0) {
      res.status(200).send(bodegas);
    } else {
      res.status(201).send({ res: "Sin Bodegas" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  consultar,
  error,
};
