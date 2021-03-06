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
    await Articulo.deleteMany({}, e => {
      console.log('Articulos Eliminados')
    })
  //res.status(200).send({ mesaje: 'actualizado correctamente' })
    let resp
    for (let p = 0; p <= 1500; p++) {
      
      resp = await axios.get(
        'http://siigoapi.azure-api.net/siigo/api/v1/Products/GetAll?numberPage='+p+'&namespace=v1',
        {
          headers: {
            'Ocp-Apim-Subscription-Key': SIIGO_SUSCRIPTION,
            Authorization: access_token
          }
        }
      )
      if (resp.status === 200 && resp.data.length>0) {
        const articulos = resp.data
        await articulos.forEach(async (articulo, i) => {
          if(articulo.AccountGroupID!==2045){
            const nuevoArticulo = new Articulo(articulo)
            await nuevoArticulo.save()
          }
        })
      } else {
        res.status(200).send({message:"Finalizado Correctamente"})
        break
      }
    }
   //res.status(200).send({resp})
  } catch (error) {
      console.log("Error al Consultar",error)
    //res.status(500).send({ res: error })
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
            PriceList4: item.PriceList4,
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
