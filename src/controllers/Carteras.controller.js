const axios = require("axios").default;
const { SIIGO_SUSCRIPTION } = require("../config/config");
/**
 * consultar cliente por documento
 */
async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { access_token } = req.token;
  let datos = [];
  //se consulta el Articulo

  for (let p = 0; p <= 200; p++) {
    try {
      const resp = await axios.get(
        "http://siigoapi.azure-api.net/siigo/api/v1/Voucher/GetAll?numberPage=" +
          p +
          "&namespace=v1",
        {
          headers: {
            "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
            Authorization: access_token,
          },
        }
      );

      datos = datos.concat(resp.data);
    } catch (e) {
      console.log(e);
      break;
    }
  }
  if (datos.length > 0) {
    console.log(datos.length);
    res.status(200).send(datos);
  } else {
    res.status(201).send({ res: "No hay datos registrados" });
  }
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  consultar,
  error,
};
