const axios = require('axios').default
const { SIIGO_SUSCRIPTION } = require('../config/config')

const Cliente = require('../models/Clientes.model')
/**
 * consultar cliente a SIIGO y se almacena en la datase
 * ejecutar diariamente
 */
async function consultarSIIGO (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const { access_token } = req.token
  try {
    //se consulta el cliente

    for (let p = 0; p <= 500; p++) {
      const resp = await axios.get(
        'http://siigoapi.azure-api.net/siigo/api/v1/Accounts/GetAll?numberPage=' +
          p +
          '&namespace=v1',
        {
          headers: {
            'Ocp-Apim-Subscription-Key': SIIGO_SUSCRIPTION,
            Authorization: access_token
          }
        }
      )
      if (resp.status === 200) {
        resp.data.forEach(async data => {
          var cliente = new Cliente({
            IdSiigo: data.Id,
            IsSocialReason: data.IsSocialReason,
            FullName: data.FullName,
            FirstName: data.FirstName,
            LastName: data.LastName,
            Identification: data.Identification,
            Address: data.Address,
            Phone: data.Phone,
            Phone1: data.Phone,
            EMail: data.EMail,
            CodeContact: data.PrincipalContactID
          })
          await cliente.save().catch(() => {})
        })
      } else break
    }
    res.status(200).send({ mesaje: 'Correcto' })
  } catch (error) {
    //console.log(error)

    res.status(500).send({ res: error })
  }
}

/* consultar clientes recibe parametro ultimo cliente
 */
async function consultar (req, res) {
  res.setHeader('Content-Type', 'application/json')

  try {
    const { ult } = req.params
    const clientes = await Cliente.find({ IdSiigo: { $gte: parseInt(ult) } })
    if (clientes.length > 0) res.status(200).send(clientes)
    else res.status(201).send({ mensaje: 'sin datos' })
  } catch (e) {
    res.status(500).send({ error: e })
  }
}

/**
 * consultar clientes recibe parametro documento
 * @param {*} req
 * @param {*} res
 */
async function consultarDocumento (req, res) {
  res.setHeader('Content-Type', 'application/json')

  try {
    const { documento } = req.params
    const clientes = await Cliente.find({ Identification: documento })
    if (clientes.length > 0) res.status(200).send(clientes[0])
    else res.status(201).send({ mensaje: 'sin datos' })
  } catch (e) {
    res.status(500).send({ error: e })
  }
}

async function consultarNombre (req, res) {
  res.setHeader('Content-Type', 'application/json')

  try {
    const { nombre } = req.params
    const clientes = await Cliente.find({
      FullName: { $regex: '.*' + nombre + '.*', $options: 'i' }
    })
    if (clientes.length > 0) res.status(200).send({ clientes })
    else res.status(201).send({ mensaje: 'sin datos' })
  } catch (e) {
    res.status(500).send({ error: e })
  }
}

function error (req, res) {
  res.status(404).send({ error: 'Página no encontrada' })
}

module.exports = {
  consultar,
  consultarSIIGO,
  consultarNombre,
  consultarDocumento,
  error
}
