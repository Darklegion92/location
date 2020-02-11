const Ruta = require("../models/Rutas.model");
const conexionFirebird = require("../services/conectionFirebird");

/*Genera el rutero del dia para el cliente
 *Requiere: parametro de idUsuario y diaSemana
 */
async function ruteroDia(req, res) {
  res.setHeader("Content-Type", "application/json");

  const { idUsuario, diaSemana } = req.query;

  //consula la tabla de clientes
  try {
    var clientes = await Ruta.find({
      idUsuario,
      visitado: false,
      diaSemana
    });
    if (clientes.length <= 0) {
      res.status(201).send({ res: "no hay ruta asignada" });
    } else {
      res.status(200).send(clientes);
    }
    /*var clientes2 = [];
    clientes.map(async (cliente, i) => {
      //consulta la cartera de los clientes por facturas
      const facturas = await conexionFirebird.queryDB(
        "select docuid as id, detalle, saldo, valor from documento where terid= ? and saldo>0 and codcomp='FV'",
        [cliente.idTNS]
      );
      const carteras = [];
      facturas.map(factura => {
        carteras.push({
          id: factura.ID,
          detalle: factura.DETALLE.toString(),
          saldo: factura.SALDO,
          valor: factura.VALOR
        });
      });

      cliente.cartera = carteras;
      clientes2.push(cliente);

      if (clientes.length == clientes2.length) res.status(200).send(clientes);
    });*/
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

  const { idUsuario, fecha } = req.query;
  //se formatea la fecha para poder hacer la consulta en mongo DB
  const fechaA = new Date(fecha);
  const otraI = new Date(fechaA.toLocaleDateString("en-US"));
  const otraF = otraI;

  const fechaI = new Date(otraI.setDate(otraI.getDate()));
  const fechaF = new Date(otraF.setDate(otraF.getDate() + 1));

  //Se consultan los clientes con todos los datos recopilados en la ruta
  try {
    var clientes = await Ruta.find({
      idUsuario,
      visitado: true,
      ultVisita: { $gte: fechaI, $lt: fechaF }
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
    idTNS,
    latitude,
    longitude,
    nombre,
    novedad,
    idNovedad,
    telefono,
    ultVisita,
    visitado,
    idUsuario
  } = req.body;

  const nuevaRuta = new Ruta({
    idUsuario,
    barrio,
    direccion,
    documento,
    idTNS,
    latitude,
    longitude,
    idNovedad,
    nombre,
    novedad,
    telefono,
    ultVisita,
    visitado
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
    idTNS,
    direccion,
    barrio,
    diaSemana
  } = req.body;
  console.log(diaSemana);

  const nuevaRuta = new Ruta({
    documento,
    telefono,
    nombre,
    idUsuario,
    idTNS,
    direccion,
    barrio,
    diaSemana
  });

  try {
    await nuevaRuta.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err: err });
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
  error
};
