const axios = require("axios").default;

var CronJob = require("cron").CronJob;

const { SIIGO_SUSCRIPTION } = require("../config/config");
const { ACCESS_TOKEN } = require("./generarTokenSIIGO");
const Articulo = require("../models/Articulos.model");

const iniciarServicios = async () => {
  const access_token = await ACCESS_TOKEN();

  //se encarga de guardar los articulos localmente
  new CronJob(
    // "* * * * mon",
    "1 * * * * mon",
    async function () {
      try {
        //se consulta el Articulo
        Articulo.deleteMany({}, (e) => {
          console.log("Articulos Eliminados");
        });
        for (let p = 0; p <= 10; p++) {
          const resp = await axios.get(
            "http://siigoapi.azure-api.net/siigo/api/v1/Products/GetAll?numberPage=" +
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
            const articulos = resp.data;

            articulos.forEach(async (articulo, i) => {
              const nuevoArticulo = new Articulo(articulo);

              nuevoArticulo.save();
            });
          } else break;
        }
        console.log("Articulos actualizados correctamente");
      } catch (error) {
        console.log("error:"+error);
      }
    },
    function () {
      console.log("Articulos actualizados correctamente");
    },
    true
  );
};

module.exports = { iniciarServicios };
