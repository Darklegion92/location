const axios = require('axios').default
const Orden = require('../models/Orden.model')
const Factura = require('../models/Factura.model')
const Cliente = require('../models/Clientes.model')
const Bodega = require('../models/Bodegas.model')
const Location = require('../models/Location.model')
const Articulo = require('../models/Articulos.model')
const Usuario = require('../models/Usuarios.model')
const Tax = require('../models/Tax.model')
const Moment = require('moment')
const { SIIGO_SUSCRIPTION, SIIGO_PARAMETROS } = require('../config/config')

/**
 * Guarda la orden
 */
async function guardar (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const {
    DocDate,
    Identification,
    DiasCredito,
    Items,
    Latitude,
    Longitude,
    Total
  } = req.body
  try {
    const { idusuario } = req

    const usuario = await Usuario.findOne({ _id: idusuario })

    const cliente = await Cliente.findOne({ Identification })
    if (cliente) {
      const orden = new Orden({
        Items,
        DocDate,
        Identification,
        FullName: cliente.FullName,
        Usuario: usuario,
        Address: cliente.Address,
        Phone: cliente.Phone,
        Total,
        DiasCredito
      })
      const neworden = await orden.save().catch(e => console.log(e))
      if (neworden) {
        const newLocation = Location({
          idUsuario: idusuario,
          nombre: cliente.FullName,
          direccion: cliente.Address,
          idVisita: neworden._id,
          tipo: 'Orden',
          latitude: Latitude,
          longitude: Longitude,
          fecha: DocDate
        })
        const resplocation = await newLocation.save()
        if (resplocation) {
          res.status(200).send(neworden)
        }
      }
    } else {
      req.status(201).send({ mensaje: 'El cliente no existe' })
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * Consulta la orden
 */
async function consultar (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const { buscar, estado, fechas, tipo } = req.query
  let resp
  let fechaI
  let fechaF
  if (fechas) {
    fechaI = new Date(
      Moment(fechas[0].replace('"', '').replace('"', '')).format('YYYY-MM-DD')
    )
    fechaF = new Date(
      Moment(fechas[1].replace('"', '').replace('"', ''))
        .add(1, 'days')
        .format('YYYY-MM-DD')
    )
  }

  if (buscar && estado && fechas) {
    if (tipo === 'nombre') {
      resp = await Orden.find({
        $and: [
          { FullName: { $regex: '.*' + buscar + '.*', $options: 'i' } },
          { Estado: estado },
          {
            DocDate: {
              $gte: fechaI,
              $lt: fechaF
            }
          }
        ]
      }).sort({ DocDate: -1 })
    } else {
      resp = await Orden.find({
        $and: [
          { Identification: { $regex: '.*' + buscar + '.*', $options: 'i' } },
          { Estado: estado },
          {
            DocDate: {
              $gte: fechaI,
              $lte: fechaF
            }
          }
        ]
      }).sort({ DocDate: -1 })
    }
  } else if (buscar && fechas) {
    if (tipo === 'nombre') {
      resp = await Orden.find({
        $and: [
          { FullName: { $regex: '.*' + buscar + '.*', $options: 'i' } },
          { Estado: 'PENDIENTE' },
          {
            DocDate: {
              $gte: fechaI,
              $lte: fechaF
            }
          }
        ]
      }).sort({ DocDate: -1 })
    } else {
      resp = await Orden.find({
        $and: [
          { Identification: { $regex: '.*' + buscar + '.*', $options: 'i' } },
          { Estado: 'PENDIENTE' },
          {
            DocDate: {
              $gte: fechaI,
              $lte: fechaF
            }
          }
        ]
      }).sort({ DocDate: -1 })
    }
  } else if (buscar && estado) {
    if (tipo === 'nombre') {
      resp = await Orden.find({
        $and: [
          { FullName: { $regex: '.*' + buscar + '.*', $options: 'i' } },
          { Estado: estado }
        ]
      }).sort({ DocDate: -1 })
    } else {
      resp = await Orden.find({
        $and: [
          { Identification: { $regex: '.*' + buscar + '.*', $options: 'i' } },
          { Estado: estado }
        ]
      }).sort({ DocDate: -1 })
    }
  } else if (estado && fechas) {
    resp = await Orden.find({
      $and: [
        { Estado: estado },
        {
          DocDate: {
            $gte: fechaI,
            $lte: fechaF
          }
        }
      ]
    }).sort({ DocDate: -1 })
  } else if (buscar) {
    if (tipo === 'nombre') {
      resp = await Orden.find({
        FullName: { $regex: '.*' + buscar + '.*', $options: 'i' }
      }).sort({ DocDate: -1 })
    } else {
      resp = await Orden.find({
        Identification: { $regex: '.*' + buscar + '.*', $options: 'i' }
      }).sort({ DocDate: -1 })
    }
  } else if (estado) {
    resp = await Orden.find({ Estado: estado }).sort({ DocDate: -1 })
  } else if (fechas) {
    console.log('aca estamos')
    resp = await Orden.find({
      DocDate: {
        $gte: fechaI,
        $lte: fechaF
      }
    }).sort({ DocDate: -1 })
  } else {
    resp = await Orden.find().sort({ DocDate: -1 })
  }
  if (resp.length > 0) res.status(200).send(resp)
  else res.status(201).send(resp)
}

/**
 * Actualiza la orden
 */
async function actualizar (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const { id, facturar, items, direccion, telefono } = req.body

  const { access_token } = req.token
  const orden = await Orden.findById(id)
  if (orden.Estado === 'Pendiente') {
    const doc = await Orden.updateOne(
      { _id: id },
      { Items: items, Address: direccion, Phone: { Number: telefono } }
    )
    if (doc.nModified > 0 && !facturar)
      res.status(200).send({ mensaje: 'guardado' })
    else if (!facturar)
      res.status(201).send({ mensaje: 'No se han hecho modificaciones' })
  } else {
    res.status(201).send({ mensaje: 'Orden ya facturada' })
  }
  //Procedemos a facturar en siigo
  if (facturar) {
    if (orden.Estado === 'Pendiente') {
      let DocDate1 = new Date()
      //Facturamos
      let Items = []
      let Total = 0
      let fecha =
        DocDate1.getFullYear().toString() +
        (DocDate1.getMonth() + 1 <10 ?"0"+(DocDate1.getMonth() + 1):DocDate1.getMonth() + 1) +
        DocDate1.getDate()
      const DueDate = fecha
      const Iva = 0
      const bodegas = await Bodega.find()
      await items.forEach(async item => {
        let idbodega
        bodegas.forEach(bodega => {
          if (bodega.Description === item.Bodega) {
            idbodega = bodega.Code
            return
          }
        })
        if (item.DiscountValue) {
        } else {
          item.DiscountValue = 0
          item.DiscountPercentage = 0
        }

        const articulo = await Articulo.find({ Code: item.Code })

        let TaxAddId = articulo[0].TaxAddID
        const tax = await Tax.findOne({ Id: articulo[0].TaxAddID })

        let TaxAddPercentage = tax ? tax.Percentage : 0

        Items.push({
          ProductCode: item.Code,
          Description: item.Description,
          GrossValue: item.Total,
          BaseValue: item.Total - item.DiscountValue,
          Quantity: item.Cantidad,
          UnitValue: item.Total / item.Cantidad,
          TaxAddId: TaxAddId,
          TaxAddPercentage: TaxAddPercentage,
          TaxDiscountId: -1,
          TotalValue: item.Total - item.DiscountValue,
          TaxAdd2Id: -1,
          DiscountPercentage: item.DiscountPercentage,
          WareHouseCode: idbodega
        })
        Total = Total + item.Total - item.DiscountValue
      })

      try {
        //consultar al api con base al documento.
        const datosCliente = await axios.get(
          'http://siigoapi.azure-api.net/siigo/api/v1/Accounts/GetByCode?identification=' +
            orden.Identification +
            '&branchOffice=000&namespace=1',
          {
            headers: {
              'Ocp-Apim-Subscription-Key': SIIGO_SUSCRIPTION,
              Authorization: access_token
            }
          }
        )
        const cliente = datosCliente.data
        const IsSocialReason = cliente.IsSocialReason
        const Address = direccion
        const Phone = { Number: telefono }
        const EMail = cliente.EMail
        const FullName = cliente.FullName
        const FirstName = cliente.FirstName
        const LastName = cliente.LastName
        const CodeContact = cliente.PrincipalContactID

        const respuesta = await axios.post(
          'http://siigoapi.azure-api.net/siigo/api/v1/Invoice/Save?namespace=namespace=v1',
         /* {
            Header: {
              DocCode: 31387,
              Number: 0,
              DocDate: '20210119',
              VATTotalValue: 0,
              RetVATTotalID: -1,
              RetVATTotalPercentage: -1,
              RetVATTotalValue: 0,
              RetICATotalID: -1,
              RetICATotalValue: 0,
              RetICATotaPercentage: -1,
              SelfWithholdingTaxID: -1,
              TotalValue: 567600,
              TotalBase: 567600,
              SalesmanIdentification: '963852741',
              Observations: 'Registro automático API-SOLTEC',
              Account: {
                IsSocialReason: false,
                FullName: 'ALFONSO PARADA CARRILLO',
                FirstName: 'ALFONSO ',
                LAstNAme: 'PARADA CARRILLO    ',
                IdTypeCode: 13,
                Identification: '88178458',
                BranchOffice: 0,
                IsVATCompanyType: false,
                City: { CountryCode: 'Co', StateCode: '54', CityCode: '54001' },
                Address: 'MZ. J4 LT. 2 TUCUNARRE',
                Phone: { Number: 5798166 }
              },
              Contact: {
                Phone1: { Number: 5798166 },
                EMail: 'juan.mesa@siigo.com',
                FirstName: 'ALFONSO ',
                LastName: 'PARADA CARRILLO    ',
                IsPrincipal: true
              }
            },
            Items: [
              {
                ProductCode: 'P038T29-101D12',
                Description: 'LUBRICOL GRASA NEGRA 16K',
                GrossValue: 93000,
                BaseValue: 93000,
                Quantity: 1,
                UnitValue: 93000,
                TaxAddId: 0,
                TaxAddPercentage: 0,
                TaxDiscountId: -1,
                TotalValue: 93000,
                TaxAdd2Id: -1,
                DiscountPercentage: 0
              },
              {
                ProductCode: 'P086T53-002D02',
                Description: 'VISCOIL VAL. 140 1/5',
                GrossValue: 95000,
                BaseValue: 95000,
                Quantity: 1,
                UnitValue: 95000,
                TaxAddId: 0,
                TaxAddPercentage: 0,
                TaxDiscountId: -1,
                TotalValue: 95000,
                TaxAdd2Id: -1,
                DiscountPercentage: 0
              },
              {
                ProductCode: 'P038T04-018D16',
                Description: 'LUBRICOL 4T 25W60 1/4',
                GrossValue: 189600,
                BaseValue: 189600,
                Quantity: 24,
                UnitValue: 7900,
                TaxAddId: 4690,
                TaxAddPercentage: '19',
                TaxDiscountId: -1,
                TotalValue: 189600,
                TaxAdd2Id: -1,
                DiscountPercentage: 0
              },
              {
                ProductCode: 'P086T30-080D12',
                Description: 'VISCOIL ISO 68 1/5',
                GrossValue: 190000,
                BaseValue: 190000,
                Quantity: 2,
                UnitValue: 95000,
                TaxAddId: 4690,
                TaxAddPercentage: '19',
                TaxDiscountId: -1,
                TotalValue: 190000,
                TaxAdd2Id: -1,
                DiscountPercentage: 0
              }
            ],
            Payments: [
              {
                PaymentMeansCode: 9087,
                Description: 'prueba de pago',
                Value: 567600,
                DueDate: '2021119',
                DueQuote: 1
              }
            ]
          }*/
          {
            Header: {
              DocCode: SIIGO_PARAMETROS.DocCode,
              Number: 0,
              DocDate: fecha,
              VATTotalValue: 0,
              RetVATTotalID: -1,
              RetVATTotalPercentage: -1,
              RetVATTotalValue: 0,
              RetICATotalID: -1,
              RetICATotalValue: 0,
              RetICATotaPercentage: -1,
              SelfWithholdingTaxID: -1,
              TotalValue: Total + Iva,
              TotalBase: Total,
              SalesmanIdentification: SIIGO_PARAMETROS.SalesmanIdentification,
              Observations: 'Registro automático API-SOLTEC',
              Account: {
                IsSocialReason: IsSocialReason,
                FullName: FullName,
                FirstName: FirstName,
                LastNAme: LastName,
                IdTypeCode: SIIGO_PARAMETROS.IdTypeCode,
                Identification: orden.Identification,
                BranchOffice: 0,
                IsVATCompanyType: false,
                City: {
                  CountryCode: SIIGO_PARAMETROS.CountryCode,
                  StateCode: SIIGO_PARAMETROS.StateCode,
                  CityCode: SIIGO_PARAMETROS.CityCode
                },
                Address: Address,
                Phone: Phone
              },
              Contact: {
                Phone1: Phone,
                EMail: EMail || EMail === ''|| EMail ===null ? SIIGO_PARAMETROS.EMailDefault : EMail,
                FirstName: FirstName,
                LastName: LastName,
                IsPrincipal: true
              }
            },
            Items: Items,
            Payments: [
              {
                PaymentMeansCode: SIIGO_PARAMETROS.PaymentMeansCode,
                Description: 'prueba de pago',
                Value: Total,
                DueDate: DueDate,
                DueQuote: 1
              }
            ]
          },
          {
            headers: {
              'Ocp-Apim-Subscription-Key': SIIGO_SUSCRIPTION,
              Authorization: access_token
            }
          }
        )
        const doc = await Orden.updateOne({ _id: id }, { Estado: 'Facturado' })
        if (doc.nModified > 0) {
          const newFactura = new Factura(respuesta.data)
          let respFactura = await newFactura.save()
          respFactura.Extras = { DiasCredito: orden.DiasCredito }
          console.log(respFactura)
          if (respFactura._id) res.status(200).send(respFactura)
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: error })
      }
    } else {
      res.status(201).send({ mensaje: 'Orden ya Facturada' })
    }
  }
}

function error (req, res) {
  res.status(404).send({ error: 'Página no encontrada' })
}

module.exports = {
  guardar,
  consultar,
  actualizar,
  error
}
