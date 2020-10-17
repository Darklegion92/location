const Articulos = require("../models/Articulos.model");
/**
 * consultar cliente por documento
 */
async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    //se consulta el Articulo
    const articulos = await Articulos.find();
    if (articulos) {
      res.status(200).send(articulos);
    } else {
      res.status(201).send({ res: "Sin Coincidencias" });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({ res: error });
  }
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  consultar,
  error,
};
