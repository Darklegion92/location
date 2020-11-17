const axios = require('axios').default
const { SIIGO_SUSCRIPTION } = require('../config/config')
const Recibo = require('../models/Recibo.model')
const Factura = require('../models/Factura.model')
/**
 * consultar cliente por documento
 */
async function consultarRecibosSiigo (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const { access_token } = req.token
  let resp
  try {
    //se consulta el Articulo
    resp
    for (let p = 1; p <= 1500; p++) {
      resp = await axios.get(
        'http://siigoapi.azure-api.net/siigo/api/v1/Voucher/GetAll?numberPage=' +
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
          const recibo = new Recibo({
            IdSiigo: data.Id,
            Number: data.Number,
            ERPDocName: data.ERPDocName,
            ERPDocDate: data.ERPDocDate,
            Identification: data.Identification,
            AccountName: data.AccountName,
            TotalValue: data.TotalValue,
            CountItems: data.CountItems
          })
          await recibo.save().catch(e => {})
        })
      } else break
    }
    res.status(200).send(resp.data)
  } catch (e) {
    if (e.request.res.statusCode === 400) {
      res.status(200).send(resp.data)
    } else res.status(500).send({ res: e })
  }
}

async function consultarFacturasSiigo (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const { access_token } = req.token
  try {
    //se consulta el Articulo
    let resp
    for (let p = 0; p <= 10000; p++) {
      resp = await axios.get(
        'http://siigoapi.azure-api.net/siigo/api/v1/Invoice/GetAll?numberPage=' +
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
          const factura = new Factura({
            IdSiigo: data.Id,
            Number: data.Number,
            ERPDocName: data.ERPDocName,
            ERPDocDate: data.ERPDocDate,
            Identification: data.Identification,
            AccountName: data.AccountName,
            TotalValue: data.TotalValue,
            CountItems: data.CountItems
          })
          await factura.save().catch(e => {})
        })
      } else break
    }
    res.status(200).send(resp.data)
  } catch (e) {
    res.status(500).send({ res: error })
  }
}

async function carteraCliente (req, res) {
  res.setHeader('Content-Type', 'application/json')

  const sumaFactura = await Factura.aggregate([
    {
      $group: {
        _id: { Identification: '$Identification' },
        totalValue: { $sum: '$TotalValue' }
      }
    }
  ])

  const sumaRecibos = await Recibo.aggregate([
    {
      $group: {
        _id: { Identification: '$Identification' },
        totalValue: { $sum: '$TotalValue' }
      }
    }
  ])
  res.status(200).send({ sumaFactura, sumaRecibos })
}

function error (req, res) {
  res.status(404).send({ error: 'Página no encontrada' })
}

module.exports = {
  consultarRecibosSiigo,
  consultarFacturasSiigo,
  carteraCliente,
  error
}
