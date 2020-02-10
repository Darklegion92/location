const conexionFirebird = require("../services/conectionFirebird");

/**
 * consultar cliente por documento
 */
async function nombre(req, res) {
  res.setHeader("Content-Type", "application/json");
  const nombre = req.params.nombre;

  try {
    //se consulta el Articulo
    const datos = await conexionFirebird.queryDB(
      "select a.matid as id, a.descrip as nombre, i.existenc as inventario FROM material a, MATERIALSUC i WHERE a.matid = i.matid and a.descrip LIKE ?",
      ["%" + nombre.toUpperCase() + "%"]
    );

    if (datos) {
      let articulos = [];
      datos.map(dato => {
        const articulo = {
          id: dato.ID.toString(),
          nombre: dato.NOMBRE.toString(),
          inventario: dato.INVENTARIO.toString()
        };
        articulos.push(articulo);
      });
      res.status(200).send(articulos);
    } else {
      res.status(201).send({ res: "Articulo no Existe" });
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
  nombre,
  error
};
