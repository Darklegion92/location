const axios = require('axios').default
const { SIIGO_SUSCRIPTION } = require('../config/config')

const Articulo = require('../models/Articulos.model')
/**
 * consultar cliente a SIIGO y se almacena en la datase
 * ejecutar diariamente
 */
async function consultarSIIGO (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const { access_token } = req.token
  try {
    //se consulta el cliente
    let resp
    //for (let p = 0; p <= 1500; p++) {
    resp = await axios.get(
      'http://siigoapi.azure-api.net/siigo/api/v1/Users/GetAll?numberPage=' +
        5 +
        '&namespace=v1',
      {
        headers: {
          'Ocp-Apim-Subscription-Key': SIIGO_SUSCRIPTION,
          Authorization: access_token
        }
      }
    )

    if (resp.status === 200) {
      resp.data
      /* resp.data.forEach(async (data) => {
          var articulo = new Articulo({
            Id: data.Id,
            Code: data.Code,
            Description: data.Description,
            ReferenceManufactures: data.ReferenceManufactures,
            ProductTypeKey: data.ProductTypeKey,
            CodeBars: data.CodeBars,
            TaxAddID: data.TaxAddID,
            TaxDiscID: data.TaxDiscID,
            IsIncluded: data.IsIncluded,
            Cost: data.Cost,
            IsInventoryControl: data.IsInventoryControl,
            State: data.State,
            PriceList1: data.PriceList4,
            PriceList2: data.PriceList2,
            PriceList3: data.PriceList3,
            PriceList4: data.PriceList4,
            PriceList5: data.PriceList5,
            PriceList6: data.PriceList6,
            PriceList7: data.PriceList7,
            PriceList8: data.PriceList8,
            PriceList9: data.PriceList9,
            PriceList10: data.PriceList10,
            PriceList11: data.PriceList11,
            PriceList12: data.PriceList12,
            Image: data.Image,
            AccountGroupID: data.AccountGroupID,
            SubType: data.SubType,
            TaxAdd2ID: data.TaxAdd2ID,
            TaxImpoValue: data.TaxImpoValue,
            Model: data.Model,
            Tariff: data.Tariff,
            Brand: data.Brand,
            MeasurementUnitCode: data.MeasurementUnitCode,
            Balance: data.Balance,
          });
          await articulo.save().catch(() => {});
        });*/
    } // else break;
    //}
    res.status(200).send(resp.data)
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
    const articulos = await Articulo.find({ Id: { $gte: parseInt(ult) } })
    if (articulos.length > 0) res.status(200).send(articulos)
    else res.status(201).send({ mensaje: 'sin datos' })
  } catch (e) {
    res.status(500).send({ error: e })
  }
}

/* consultar stock items
 */
async function consultarItems (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const { items } = req.query
  const articulos = []
  try {
    if (items) {
      await items.forEach(async (itemjson, i) => {
        const item = JSON.parse(itemjson)
        const articulo = await Articulo.findOne({ Code: item.Code })
        if (articulo) {
          articulos.push({
            Cantidad: item.Cantidad,
            Total: item.Total,
            PriceList1: item.PriceList1,
            Balance: articulo.Balance,
            AccountGroupID: articulo.AccountGroupID,
            Code: articulo.Code,
            Description: articulo.Description,
            DiscountPercentage: item.DiscountPercentage,
            Bodega: item.Bodega,
            DiscountValue: item.DiscountValue
          })
        } else {
          item.Balance = 0
          articulos.push(item)
        }

        if (i === items.length - 1)
          if (articulos.length > 0) res.status(200).send(articulos)
      })
    } else res.status(201).send({ mensaje: 'sin datos' })
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
    const { codigo } = req.params
    const articulos = await Articulo.find({ Code: codigo })
    if (articulos.length > 0) res.status(200).send(articulos[0])
    else res.status(201).send({ mensaje: 'sin datos' })
  } catch (e) {
    res.status(500).send({ error: e })
  }
}

async function consultarNombre (req, res) {
  res.setHeader('Content-Type', 'application/json')

  try {
    const { nombre } = req.params
    const articulos = await Articulo.find({
      Description: { $regex: '.*' + nombre + '.*', $options: 'i' }
    })
    if (articulos.length > 0) res.status(200).send(articulos)
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
  consultarItems,
  consultarSIIGO,
  consultarNombre,
  consultarDocumento,
  error
}
