const axios = require("axios").default;
const { SIIGO_SUSCRIPTION, SIIGO_PARAMETROS } = require("../config/config");
const Tax = require("../models/Tax.model");

async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  var bodegas;
  try {
    taxes = await Tax.find();
    if (taxes.length > 0) {
      res.status(200).send(taxes);
    } else {
      res.status(201).send({ res: "Sin Taxes" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function consultarsiigo(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { access_token } = req.token
  try {
    //se consulta el Articulo
    await Tax.deleteMany({}, e => {
      console.log('Taxes Eliminados')
    })
  // res.status(200).send({mensaje:"Correctamente Actualizados"})
    for (let p = 0; p <= 1500; p++) {
      const resp = await axios.get(
        'http://siigoapi.azure-api.net/siigo/api/v1/taxes/GetAll?numberPage=' +
          p +
          '&namespace=v1',
        {
          headers: {
            'Ocp-Apim-Subscription-Key': SIIGO_SUSCRIPTION,
            Authorization: access_token
          }
        }
      )
      if (resp.status === 200 && resp.data.length>0) {
        const taxes = resp.data
        taxes.forEach(async (tax, i) => {
          const nuevaTax = new Tax(tax)
          nuevaTax.save()
        })
      } else break
    }
   res.status(200).send({mensaje:"Correctamente Actualizados"})
  } catch (error) {
    console.log(error)
  }
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  consultar,
  consultarsiigo,
  error,
};
