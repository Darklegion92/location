const axios = require("axios").default;
const { SIIGO_SUSCRIPTION } = require("../config/config");
/**
 * consultar cliente por documento
 */
async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { access_token } = req.token;
  try {
    //se consulta el cliente
    let datos = [];
    for (let p = 0; p <= 500; p++) {
      const resp = await axios.get(
        "http://siigoapi.azure-api.net/siigo/api/v1/Accounts/GetAll?numberPage=" +
          p +
          "&namespace=v1",
        {
          headers: {
            "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
            Authorization: access_token,
          },
        }
      );
      if (resp.status === 200) {
        datos = datos.concat(resp.data);
      } else break;
    }
    res.status(200).send(JSON.stringify(datos.data));
    if (datos.data.Id !== 0) {
      var cliente = {
        idSIIGO: datos.data.Id,
        documento: datos.data.Identification,
        nombre: datos.data.FullName,
        direccion: datos.data.Address,
        telefono: datos.data.Phone.Number,
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

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  consultar,
  error,
};
