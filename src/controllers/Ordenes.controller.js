const axios = require("axios").default;
const Orden = require("../models/Orden.model");
const Cliente = require("../models/Clientes.model");
const Location = require("../models/Location.model");
const { SIIGO_SUSCRIPTION, SIIGO_PARAMETROS } = require("../config/config");

/**
 * Guarda la orden
 */
async function guardar(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const {
    DocDate,
    Identification,
    Items,
    Latitude,
    Longitude,
    Total,
  } = req.body;

  const { idusuario } = req;

  const cliente = await Cliente.findOne({ Identification });
  if (cliente) {
    const orden = new Orden({
      Items,
      DocDate,
      Identification,
      FullName: cliente.FullName,
      idUsuario: idusuario,
      Total,
    });
    const neworden = await orden.save().catch((e) => console.log(e));
    if (neworden) {
      const newLocation = Location({
        idUsuario: idusuario,
        idVisita: neworden._id,
        tipo: "Orden",
        latitude: Latitude,
        longitude: Longitude,
        fecha: DocDate,
      });
      const resplocation = await newLocation.save();
      if (resplocation) {
        res.status(200).send(neworden);
      }
    }
  } else {
    req.status(201).send({ mensaje: "El cliente no existe" });
  }
}

/**
 * Consulta la orden
 */
async function consultar(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const { buscar, estado, fechas, tipo } = req.query;
  let resp;
  if (buscar && estado && fechas) {
    if (tipo === "nombre") {
      resp = await Orden.find({
        $and: [
          { FullName: { $regex: ".*" + buscar + ".*", $options: "i" } },
          { Estado: estado },
          {
            DocDate: {
              $gte: new Date(fechas[0].replace('"', "").replace('"', "")),
            },
          },
          {
            DocDate: {
              $lte: new Date(fechas[1].replace('"', "").replace('"', "")),
            },
          },
        ],
      });
    } else {
      resp = await Orden.find({
        $and: [
          { Identification: { $regex: ".*" + buscar + ".*", $options: "i" } },
          { Estado: estado },
          {
            DocDate: {
              $gte: new Date(fechas[0].replace('"', "").replace('"', "")),
            },
          },
          {
            DocDate: {
              $lte: new Date(fechas[1].replace('"', "").replace('"', "")),
            },
          },
        ],
      });
    }
  } else if (buscar && fechas) {
    if (tipo === "nombre") {
      resp = await Orden.find({
        $and: [
          { FullName: { $regex: ".*" + buscar + ".*", $options: "i" } },
          {
            DocDate: {
              $gte: new Date(fechas[0].replace('"', "").replace('"', "")),
            },
          },
          {
            DocDate: {
              $lte: new Date(fechas[1].replace('"', "").replace('"', "")),
            },
          },
        ],
      });
    } else {
      resp = await Orden.find({
        $and: [
          { Identification: { $regex: ".*" + buscar + ".*", $options: "i" } },
          {
            DocDate: {
              $gte: new Date(fechas[0].replace('"', "").replace('"', "")),
            },
          },
          {
            DocDate: {
              $lte: new Date(fechas[1].replace('"', "").replace('"', "")),
            },
          },
        ],
      });
    }
  } else if (buscar && estado) {
    if (tipo === "nombre") {
      resp = await Orden.find({
        $and: [
          { FullName: { $regex: ".*" + buscar + ".*", $options: "i" } },
          { Estado: estado },
        ],
      });
    } else {
      resp = await Orden.find({
        $and: [
          { Identification: { $regex: ".*" + buscar + ".*", $options: "i" } },
          { Estado: estado },
        ],
      });
    }
  } else if (estado && fechas) {
    resp = await Orden.find({
      $and: [
        { Estado: estado },
        {
          DocDate: {
            $gte: new Date(fechas[0].replace('"', "").replace('"', "")),
          },
        },
        {
          DocDate: {
            $lte: new Date(fechas[1].replace('"', "").replace('"', "")),
          },
        },
      ],
    });
  } else if (buscar) {
    if (tipo === "nombre") {
      resp = await Orden.find({
        FullName: { $regex: ".*" + buscar + ".*", $options: "i" },
      });
    } else {
      resp = await Orden.find({
        Identification: { $regex: ".*" + buscar + ".*", $options: "i" },
      });
    }
  } else if (estado) {
    resp = await Orden.find({ Estado: estado });
  } else if (fechas) {
    resp = await Orden.find({
      $and: [
        {
          DocDate: {
            $gte: new Date(fechas[0].replace('"', "").replace('"', "")),
          },
        },
        {
          DocDate: {
            $lte: new Date(fechas[1].replace('"', "").replace('"', "")),
          },
        },
      ],
    });
  } else {
    res.status(201).send({ mensaje: "sin datos para la consulta" });
    return;
  }
  console.log(resp);
  res.status(200).send(resp);
}

/**
 * Actualiza la orden
 */
async function actualizar(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const { id, facturar, items, direccion, telefono } = req.body;
  const { access_token } = req.token;

  const doc = await Orden.updateOne(
    { _id: id },
    { Items: items, Address: direccion, Phone: { Number: telefono } }
  );
  if (doc.nModified > 0 && !facturar)
    res.status(200).send({ mensaje: "guardado" });
  else if (!facturar)
    res.status(201).send({ mensaje: "no se han hecho modificaciones" });

  //Procedemos a facturar en siigo
  if (facturar) {
    const orden = await Orden.findById(id);

    if (orden.Estado === "Pendiente") {
      let DocDate1 = new Date();
      //Facturamos
      let Items = [];
      let Total = 0;
      let fecha =
        DocDate1.getFullYear().toString() +
        (DocDate1.getMonth() + 1) +
        DocDate1.getDate();
      const DueDate = fecha;
      const Iva = 0;
      await items.forEach((item) => {
        Items.push({
          ProductCode: item.Code,
          Description: item.Description,
          GrossValue: item.Cantidad * item.Precio,
          BaseValue: item.Cantidad * item.Precio,
          Quantity: item.Cantidad,
          UnitValue: item.Precio,
          TaxAddId: -1,
          TaxDiscountId: -1,
          TotalValue: item.Cantidad * item.Precio,
          TaxAdd2Id: -1,
        });
        Total = Total + item.Cantidad * item.Precio;
      });

      try {
        //consultar al api con base al documento.
        const datosCliente = await axios.get(
          "http://siigoapi.azure-api.net/siigo/api/v1/Accounts/GetByCode?identification=" +
            orden.Identification +
            "&branchOffice=000&namespace=1",
          {
            headers: {
              "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
              Authorization: access_token,
            },
          }
        );

        const cliente = datosCliente.data;
        const IsSocialReason = cliente.IsSocialReason;
        const Address = direccion;
        const Phone = { Number: telefono };
        const EMail = cliente.EMail;
        const FullName = cliente.FullName;
        const FirstName = cliente.FirstName;
        const LastName = cliente.LastName;
        const CodeContact = cliente.PrincipalContactID;
        const respuesta = await axios.post(
          "http://siigoapi.azure-api.net/siigo/api/v1/Invoice/Save?namespace=namespace=v1",
          {
            Header: {
              DocCode: SIIGO_PARAMETROS.DocCode,
              Number: 0,
              DocDate: fecha,

              RetVATTotalID: -1,

              RetVATTotalPercentage: -1,

              RetICATotalID: -1,

              RetICATotaPercentage: -1,

              TotalValue: Total + Iva,

              TotalBase: Total,

              SalesmanIdentification: SIIGO_PARAMETROS.SalesmanIdentification,

              Observations: "Registro automático API-SOLTEC",

              Account: {
                IsSocialReason: IsSocialReason,

                FullName: FullName,

                FirstName: FirstName,

                LastName: LastName,

                IdTypeCode: SIIGO_PARAMETROS.IdTypeCode,

                Identification: orden.Identification,

                BranchOffice: 0,

                IsVATCompanyType: false,

                City: {
                  CountryCode: SIIGO_PARAMETROS.CountryCode,

                  StateCode: SIIGO_PARAMETROS.StateCode,

                  CityCode: SIIGO_PARAMETROS.CityCode,
                },

                Address: Address,

                Phone: Phone,
              },

              Contact: {
                Code: CodeContact,

                Phone1: Phone,

                Mobile: {
                  Number: 0,
                },

                EMail: EMail === "" ? "correo@falso.com" : EMail,

                FirstName: FirstName,

                LastName: LastName,

                IsPrincipal: true,
              },
            },

            Items: Items,

            Payments: [
              {
                PaymentMeansCode: SIIGO_PARAMETROS.PaymentMeansCode,

                Value: Total,

                DueDate: DueDate,

                DueQuote: 1,
              },
            ],
          },
          {
            headers: {
              "Ocp-Apim-Subscription-Key": SIIGO_SUSCRIPTION,
              Authorization: access_token,
            },
          }
        );
        console.log(respuesta.header);
        const doc = await Orden.updateOne({ _id: id }, { Estado: "Facturado" });
        if (doc.nModified > 0) {
          res.status(200).send({ mensaje: "guardado" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: error });
      }
    } else {
      res.status(201).send({ mensaje: "Orden ya Facturada" });
    }
  }
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  guardar,
  consultar,
  actualizar,
  error,
};
