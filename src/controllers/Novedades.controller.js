const NovedadesVisitas = require("../models/NovedadesVisita.model");
const Novedades = require("../models/Novedades.model");
const Cliente = require("../models/Clientes.model");
const Location = require("../models/Location.model");
/*Genera el rutero del dia para el cliente
 *Requiere: parametro de idUsuario y diaSemana
 */
async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
  //consula la tabla de novedaes
  try {
    var novedades = await Novedades.find();
    if (novedades.length > 0) {
      res.status(200).send(novedades);
    } else {
      res.status(201).send(novedades);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function guardar(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { idusuario } = req;
  const {
    DocDate,
    IdNovedad,
    Identification,
    Latitude,
    Longitude,
    NombreNovedad,
  } = req.body;

  try {
    const cliente = await Cliente.findOne({ Identification });
    if (cliente) {
      const novedad = new NovedadesVisitas({
        DocDate,
        idUsuario: idusuario,
        FullName: cliente.FullName,
        Address: cliente.Address,
        Phone: cliente.Phone,
        Identification,
        IdNovedad,
        NombreNovedad,
      });

      const newNovedad = await novedad.save().catch((e) => console.log(e));
      if (newNovedad) {
        const newLocation = Location({
          idUsuario: idusuario,
          nombre: cliente.FullName,
          direccion: cliente.Address,
          idVisita: newNovedad._id,
          tipo: "Novedad",
          latitude: Latitude,
          longitude: Longitude,
          fecha: DocDate,
        });
        const resplocation = await newLocation.save();
        if (resplocation) {
          res.status(200).send(newNovedad);
        }
      }
    } else {
      res.status(201).send({ mensaje: "El cliente no existe" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

/*
 *Toda ruta no existente se redirecciona a esta URL
 */
function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  consultar,
  guardar,
  error,
};
