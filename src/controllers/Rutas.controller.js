const Ruta = require("../models/Rutas.model");
const conexionFirebird = require("../services/conectionFirebird");

async function idUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  const idUsuario = req.params.idUsuario;
  try {
    var rutero = [];
    var clientes = await Ruta.find({ idUsuario });
    clientes.map(async (cliente, i) => {
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
      const {
        _id,
        novedad,
        barrio,
        visitado,
        creado,
        nombre,
        direccion,
        idUsuario,
        idTNS,
        documento,
        telefono
      } = cliente;
      const ruta = {
        _id,
        novedad,
        barrio,
        visitado,
        creado,
        nombre,
        direccion,
        idUsuario,
        idTNS,
        documento,
        telefono,
        carteras
      };
      rutero.push(ruta);
      if (clientes.length === i + 1) {
        res.status(200).send(rutero);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function guardarRuta(req, res) {
  res.setHeader("Content-Type", "application/json");
  const {
    documento,
    telefono,
    nombre,
    idUsuario,
    idTNS,
    direccion,
    barrio
  } = req.body;

  const nuevaRuta = new Ruta({
    documento,
    telefono,
    nombre,
    idUsuario,
    idTNS,
    direccion,
    barrio
  });
  try {
    await nuevaRuta.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }
}
async function login(req, res) {
  res.setHeader("Content-Type", "application/json");
  /* var user;
  try {
    const { usuario, password } = req.body;
    user = await Usuario.find({ usuario, password });
    if (user[0]) {
      res.status(200).send(user[0]);
    } else {
      res.status(201).send({ res: "Usuario o Clave No Validos", status: 201 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }*/
}

async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  /*var users;
  try {
    users = await Usuario.find();
    if (users[0]) {
      res.status(200).send(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }*/
}

async function actualizarUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");

  /*const { id, password } = req.body;

  try {
    const resp = await Usuario.updateOne({ id }, { password });
    console.log(resp);

    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }*/
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  idUsuario,
  guardarRuta,
  actualizarUsuario,
  login,
  consultar,
  error
};
