const Ruta = require("../models/Visitas.model");
const axios = require("axios").default;
const qs = require("qs");
const { SIIGO_SUSCRIPTION } = require("../config/config");
/*Genera el rutero del dia para el cliente
 *Requiere: parametro de idUsuario y diaSemana
 */
async function guardarRecibo(req, res) {
  res.setHeader("Content-Type", "application/json");

  const {
    idUsuario,
    idClienteSIIGO,
    fullName,
    documentoCliente,
    direccion,
    telefono,
    latitude,
    longitude,
  } = req.query;

  //consula la tabla de clientes
  const { access_token } = req.token;
  try {
    //se consulta el cliente

    const datos = await axios.get(
      "http://siigoapi.azure-api.net/siigo/api/v1/Invoice/GetAll?numberPage=2&namespace=v1",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
          Authorization: access_token,
        },
      }
    );

    /* const datos = await axios.post(
      "http://siigoapi.azure-api.net/siigo/api/v1/Voucher/Save?namespace=v1",
      qs.stringify({
        Header: {
          DocCode: 6617,
          DocDate: "20200926",
          TotalValue: 5000,
          Identification: "001",
          BranchOffice: 000,
          VoucherType: 0,
          PaymentMeanCode: 9027,
          Observations: "PRUEBA DE ALGO QUE SE ESTA HACIENDO",
        },
        Items: [],
      }),
      {
        headers: {
          "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
          Authorization: access_token,
        },
      }
    );*/
    //console.log(datos);
    /* var visita = await Ruta.save({
      idUsuario,
      tipo: true,
      efectiva: true,
      documentoCliente,
      fullName,
      direccion,
      telefono,
      latitude,
      longitude,
    });*/

    res.status(200).send(datos.data);
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
      ultVisita: { $gte: fechaI, $lt: fechaF },
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
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    console.log(err);

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
  guardarRecibo,
  error,
};
