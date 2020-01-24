const conexionFirebird = require("../services/conectionFirebird");
const CONFIG = require("../config/config");

async function idCliente(req, res) {
  res.setHeader("Content-Type", "application/json");
  const idCliente = req.params.idCliente;

  await conexionFirebird(
    CONFIG.USER_FIREBIRD,
    CONFIG.PASS_FIREBIRD,
    async (err, db) => {
      db.query(
        "select terid AS idTNS, nit as documento,  t.nombre, direcc1 as direccion, z.nombre as barrio, telef1 as telefono  from terceros t, zonas z where z.ZONAID = t.zona1 and nit = ?",
        [idCliente],
        (err, datos) => {
          if (err) console.log(err);

          let clientes = {};
          datos.map(dato => {
            clientes = {
              documento: dato.DOCUMENTO.toString(),
              idTNS: dato.IDTNS.toString(),
              nombre: dato.NOMBRE.toString(),
              direccion: dato.DIRECCION.toString(),
              barrio: dato.BARRIO.toString(),
              telefono: dato.TELEFONO.toString()
            };
          });
          res.status(200).send({ res: clientes });
        }
      );
    }
  );
}
async function grabarUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  /*const { nombre, usuario, password } = req.body;

  const nuevoUsuario = new Usuario({
    nombre,
    usuario,
    password
  });
  try {
    await nuevoUsuario.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }*/
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
  idCliente,
  grabarUsuario,
  actualizarUsuario,
  login,
  consultar,
  error
};
