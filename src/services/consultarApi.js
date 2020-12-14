const axios = require('axios').default

var CronJob = require('cron').CronJob

const { SIIGO_SUSCRIPTION } = require('../config/config')
const { ACCESS_TOKEN } = require('./generarTokenSIIGO')
const Articulo = require('../models/Articulos.model')
const Bodega = require('../models/Bodegas.model')
const Cliente = require('../models/Clientes.model')

const iniciarServicios = async () => {
  const access_token = await ACCESS_TOKEN()

  //se encarga de guardar los articulos localmente
  new CronJob(
    // "* * * * mon",
    '15 * * * *',
    async function () {
      console.log('se inicia actualizacion diaria de articulos')
      try {
        //se consulta el Articulo
        await Articulo.deleteMany({}, e => {
          console.log('Articulos Eliminados')
        })
        for (let p = 0; p <= 1500; p++) {
          const resp = await axios.get(
            'http://siigoapi.azure-api.net/siigo/api/v1/Products/GetAll?numberPage=' +
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
            const articulos = resp.data

            articulos.forEach(async (articulo, i) => {
              const nuevoArticulo = new Articulo(articulo)

              nuevoArticulo.save()
            })
          } else break
        }
        console.log('Articulos actualizados correctamente')
      } catch (error) {
        console.log('error:' + error)
      }
    },
    function () {
      console.log('Articulos actualizados correctamente')
    },
    true
  )

 new CronJob(
    '15 * * * *',
    async function () {
      console.log('se inicia actualizacion diaria de bodegas')
      try {
        //se consulta el Articulo
        await Bodega.deleteMany({}, e => {
          console.log('Bodegas Eliminados')
        })
        for (let p = 0; p <= 1500; p++) {
          const resp = await axios.get(
            'http://siigoapi.azure-api.net/siigo/api/v1/Warehouses/GetAll?numberPage=' +
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
            const bodegas = resp.data

            bodegas.forEach(async (bodega, i) => {
              const nuevaBodega = new Bodega(bodega)

              nuevaBodega.save()
            })
          } else break
        }
        console.log('Bodegas actualizados correctamente')
      } catch (error) {
        console.log(error)
      }
    },
    function () {
      console.log('Bodegas actualizados correctamente')
    },
    true
  )

  new CronJob(
    '15 * * * *',
    async function () {
      console.log('se inicia actualizacion diaria de clientes')
      await Cliente.deleteMany({}, e => {
        console.log('Clientes Eliminados')
      })
      for (let p = 0; p <= 1000; p++) {
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
        } else {
          break
        }
      }
    },
    function () {
      console.log('Bodegas actualizados correctamente')
    },
    true
  )
}

module.exports = { iniciarServicios }
