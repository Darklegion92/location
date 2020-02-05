const conexionFirebird = require("../services/conectionFirebird");

async function documento(req, res) {
  res.setHeader("Content-Type", "application/json");
  const documento = req.params.documento;
  try {
    const datos = await conexionFirebird.queryDB(
      "select terid AS idTNS, nit as documento,  t.nombre, direcc1 as direccion, z.nombre as barrio, telef1 as telefono  from terceros t, zonas z where z.ZONAID = t.zona1 and nit = ?",
      [documento]
    );

    if (datos) {
      var cliente = {};
      datos.map(data => {
        cliente = {
          idTNS: data.IDTNS,
          documento: data.DOCUMENTO.toString(),
          nombre: data.NOMBRE.toString(),
          direccion: data.DIRECCION.toString(),
          barrio: data.BARRIO.toString(),
          telefono: data.TELEFONO.toString()
        };
      });
      res.status(200).send(cliente);
    } else {
      res.status(201).send({ res: "Cliente no Existe" });
    }
  } catch (error) {
    console.log(error);

    res.status(200).send({ res: error });
  }
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
  grabarUsuario,
  actualizarUsuario,
  login,
  documento,
  consultar,
  error
};