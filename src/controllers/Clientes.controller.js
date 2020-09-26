const conexionFirebird = require("../services/conectionFirebird");
const axios = require("axios").default;
const { SIIGO_SUSCRIPTION } = require("../config/config");
/**
 * consultar cliente por documento
 */
async function documento(req, res) {
  res.setHeader("Content-Type", "application/json");
  const documento = req.params.documento;
  const { access_token } = req.token;
  try {
    //se consulta el cliente

    const datos = await axios.get(
      "http://siigoapi.azure-api.net/siigo/api/v1/Accounts/GetByCode?identification=" +
        documento +
        "&branchOffice=000&namespace=1",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
          Authorization: access_token,
        },
      }
    );
    console.log(datos.data);
    if (datos.data.Id!==0) {
      var cliente = {
        idSIIGO: datos.data.Id,
        documento: datos.data.Identification,
        nombre: datos.data.FullName,
        direccion:datos.data.Address,
        telefono:datos.data.Phone.Number,
        carteras: [],
      };
      res.status(200).send(cliente);
    } else {
      res.status(201).send({ res: "Cliente no Existe" });
    }
  } catch (error) {
    console.log(error);

    res.status(200).send({ res: error });
  }
}
async function guardarCartera(req, res) {
  res.setHeader("Content-Type", "application/json");
  //const { nombre, usuario, password } = req.body;

  /*const nuevoUsuario = new Usuario({
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
  guardarCartera,
  actualizarUsuario,
  login,
  documento,
  consultar,
  error,
};
