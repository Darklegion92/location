const Usuario = require("../models/Usuarios.model");
const service = require("../services/service");
const axios = require("axios").default;
const { SIIGO_SUSCRIPTION } = require("../config/config");

async function id(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { access_token } = req.token;
  try {
    const result = await axios.get(
      "http://siigoapi.azure-api.net/siigo/api/v1/Accounts/GetByCode?identification=001&branchOffice=000&namespace=1",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
          Authorization: access_token,
        },
      }
    );
    console.log(result);
    res.status(200).send(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
async function grabarUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { nombre, usuario, password } = req.body;

  const nuevoUsuario = new Usuario({
    nombre,
    usuario,
    password,
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
    //rearmar para enviar token jwt
    if (user[0]) {
      const rest = {
        nombre: user[0].nombre,
        usuario: user[0].usuario,
        creado: user[0].creado,
        idUsuario: user[0]._id,
        autorization_key: service.createToken(user[0]),
        rol:user[0].rol,
      };
      res.status(200).send(rest);
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

  const { id, password } = req.body;

  try {
    const resp = await Usuario.updateOne({ id, password });

    if (resp.nModified > 0)
      res.status(200).send({ res: "Guardado Correctamente" });
    else res.status(201).send({ res: "Usuario No Encontrado" });
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
  error,
};
