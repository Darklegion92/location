const Ruta = require("../models/Rutas.model");
const conexionFirebird = require("../services/conectionFirebird");

/*Genera el rutero del dia para el cliente
 *Requiere: parametro de idUsuario y diaSemana
 */
async function ruteroDia(req, res) {
  res.setHeader("Content-Type", "application/json");

  const { idUsuario, diaSemana } = req.query;

  //consula la tabla de clientes
  let dia = new Date().getDay();
  if (diaSemana) {
    dia = diaSemana;
  }

  try {
    var clientes = await Ruta.find({
      idUsuario,
      diaSemana: dia,
    });
    if (clientes.length <= 0) {
      res.status(201).send({ res: "no hay ruta asignada" });
    } else {
      res.status(200).send(clientes);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

/*Genera la información de la ruta realizada con el cliente
 *Requiere: Requiere: parametro de idUsuario y fecha
 */
async function informeRutas(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { idUsuario } = req.query;
  //se formatea la fecha para poder hacer la consulta en mongo DB

  //Se consultan los clientes con todos los datos recopilados en la ruta
  try {
    var clientes = await Ruta.find({
      idUsuario,
    });
    if (clientes.length <= 0) {
      res.status(201).send({ res: "no hay ruta recorrida" });
    } else {
      res.status(200).send(clientes);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function eliminarRuta(req, res) {
  res.setHeader("Content-Type", "application/json");

  const { id, idUsuario } = req.body;
  //se formatea la fecha para poder hacer la consulta en mongo DB

  //Se consultan los clientes con todos los datos recopilados en la ruta
  try {
    var eliminado = await Ruta.deleteOne({
      _id: id,
    });
    if (eliminado.ok > 0) {
      const rutas = await Ruta.find({
        idUsuario,
      });
      res.status(200).send(rutas);
    } else {
      res.status(201).send({ res: "no hay ruta para eliminar" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

/*Guarda la ruta que realiza el usuario desde la aplicacion movil
 *Requiere: barrio,direccion, documento,idTNS,latitude,longitude, 
 nombre, novedad, telefono, ultVisita, visitado, idUsuario
 */
async function guardarVisita(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);

  const {
    barrio,
    direccion,
    documento,
    idSIIGO,
    latitude,
    longitude,
    nombre,
    novedad,
    idNovedad,
    telefono,
    ultVisita,
    visitado,
    idUsuario,
  } = req.body;
  console.log(req.body);
  const nuevaRuta = new Ruta({
    idUsuario,
    barrio,
    direccion,
    documento,
    idSIIGO,
    latitude,
    longitude,
    idNovedad,
    nombre,
    novedad,
    telefono,
    ultVisita,
    visitado,
  });
  try {
    await nuevaRuta.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    console.log(err);

    res.status(400).send({ err });
  }
}

/* Guarda la ruta por dias para las visitas
 * Requiere: documento, telefono, nombre, idUsuario, idTNS, direccion, barrio, diaSemana
 */
async function guardarRuta(req, res) {
  res.setHeader("Content-Type", "application/json");

  const {
    documento,
    telefono,
    nombre,
    idUsuario,
    idSIIGO,
    direccion,
    diaSemana,
  } = req.body;

  const nuevaRuta = new Ruta({
    documento,
    telefono,
    nombre,
    idUsuario,
    idSIIGO,
    direccion,
    diaSemana,
  });

  try {
    await nuevaRuta.save();
    const rutas = await Ruta.find({ idUsuario, diaSemana });
    res.status(200).send(rutas);
  } catch (err) {
    console.log(err);

    res.status(500).send({ err: err });
  }
}

/*
 *Toda ruta no existente se redirecciona a esta URL
 */
function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  ruteroDia,
  informeRutas,
  guardarVisita,
  guardarRuta,
  eliminarRuta,
  error,
};
