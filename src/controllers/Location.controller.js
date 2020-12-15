const Location = require("../models/Location.model");

const Moment = require("moment");
async function id(req, res) {
  res.setHeader("Content-Type", "application/json");
  /*var con = conexionMYSQL.con;
  const sql = "SELECT idCliente FROM clientes WHERE idFacebook = ?";
  const parametros = [req.params.id];
  await con.query(sql, parametros, function(err, result) {
    if (err) throw err;
    if (result) res.status(200).send(result);
    res.status(201);
  });
  try {
    con.release();
  } catch (e) {}*/
}
async function grabarLocation(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { idUsuario, latitude, longitude, fecha } = req.body;
  const nuevaLocation = new Location({
    idUsuario,
    latitude,
    longitude,
    fecha,
  });
  try {
    await nuevaLocation.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }
}
async function obtenerLocation(req, res) {
  res.setHeader("Content-Type", "application/json");
  var locations;
  try {
    const { usuario, fechas } = req.query;
    const fechaInicial = Moment(new Date(fechas[0].split("T")[0])).format(
      "YYYY-MM-DD"
    );
    const fechaFinal = Moment(new Date(fechas[1].split("T")[0]))
      .add(1, "days")
      .format("YYYY-MM-DD");
    console.log(fechaFinal);
    locations = await Location.find({
      fecha: {
        $gte: new Date(fechaInicial),
        $lt: new Date(fechaFinal),
      },
    });

    if (locations.length > 0) {
      res.status(200).send(locations);
    } else {
      res
        .status(201)
        .send({ res: "No Se Encontraron Coincidencias", status: 201 });
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
  id,
  grabarLocation,
  obtenerLocation,
  error,
};
