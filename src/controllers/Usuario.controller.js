const Usuario = require("../models/Usuarios.model");

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
async function grabarUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { nombre, usuario, password } = req.body;

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
  }
}
async function login(req, res) {
  res.setHeader("Content-Type", "application/json");
  var user;
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
  }
}

async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  var users;
  try {
    users = await Usuario.find();
    if (users[0]) {
      res.status(200).send(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function actualizarUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { _id, password } = req.body;

  try {
    const resp = await Usuario.updateOne({ _id }, { password });
    console.log(resp);
    
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  id,
  grabarUsuario,
  actualizarUsuario,
  login,
  consultar,
  error
};
