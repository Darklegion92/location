const axios = require("axios").default;
const { SIIGO_SUSCRIPTION, SIIGO_PARAMETROS } = require("../config/config");

/**
 * Guarda la factura de venta
 */
async function guardar(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const { access_token } = req.token;
  const {
    DocDate,
     Total,
    Items,
    Identification,
    Latitude,
    Longitude,
  } = req.body;

  const Items1 = [];

  await Items.forEach((item) => {
    Items1.push({
      ProductCode: item.Code,

      Description: item.Description,

      GrossValue: item.Cantidad * item.PriceList1,

      BaseValue: item.Cantidad * item.PriceList1,

      Quantity: item.Cantidad,

      UnitValue: item.PriceList1,

      TaxAddId: -1,

      TaxDiscountId: -1,

      TotalValue: item.Cantidad * item.PriceList1,

      TaxAdd2Id: -1,
    });
  });
  //Datos de frontend
 /* const Identification = "1";
  //const fecha = "20201016";
  const Total = 30000;

  const Items1 = [
    {
      ProductCode: "TTTT1111",

      Description: "Media azules Deimer",

      GrossValue: 30000,

      BaseValue: 30000,

      Quantity: 2,

      UnitValue: 15000,

      TaxAddId: -1,

      TaxDiscountId: -1,

      TotalValue: 30000,

      TaxAdd2Id: -1,
    },
  ];*/

  //fin datos Frontend

  //fecha limite de pago por definir mientratanto esta a 30 dias de la fecha
  let DocDate1 = new Date(DocDate);
  let fecha =
    DocDate1.getFullYear().toString() +
    (DocDate1.getMonth() + 1) +
    DocDate1.getDate();
  console.log(fecha);
  const DueDate = fecha;
  const Iva = 0;
  try {
    //consultar al api con base al documento.
    const datosCliente = await axios.get(
      "http://siigoapi.azure-api.net/siigo/api/v1/Accounts/GetByCode?identification=" +
        Identification +
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
    const Address = cliente.Address;
    const Phone = cliente.Phone;
    const EMail = cliente.EMail;
    const FullName = cliente.FullName;
    const FirstName = cliente.FirstName;
    const LastName = cliente.LastName;
    const CodeContact = cliente.PrincipalContactID;
    console.log(Items1);
    await axios.post(
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

            Identification: Identification,

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

        Items: Items1,

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

    res.status(200).send("correcto");
  } catch (error) {
    console.log(error);
    res.status(500).send({ res: error });
  }
}
async function guardarCartera(req, res) {
  res.setHeader("Content-Type", "application/json");
  //const { nombre, usuario, password } = req.body;

  /*const nuevoUsuario = new Usuario({
    nombre,
    usuario,
    password
  });
  try {
    await nuevoUsuario.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }*/
}
async function login(req, res) {
  res.setHeader("Content-Type", "application/json");
  /* var user;
  try {
    const { usuario, password } = req.body;
    user = await Usuario.find({ usuario, password });
    if (user[0]) {
      res.status(200).send(user[0]);
    } else {
      res.status(201).send({ res: "Usuario o Clave No Validos", status: 201 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }*/
}

async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  /*var users;
  try {
    users = await Usuario.find();
    if (users[0]) {
      res.status(200).send(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }*/
}

async function actualizarUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");

  /*const { id, password } = req.body;

  try {
    const resp = await Usuario.updateOne({ id }, { password });
    console.log(resp);

    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }*/
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  guardar,
  error,
};
