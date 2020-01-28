const Ruta = require("../models/Rutas.model");
const conexionFirebird = require("../services/conectionFirebird");

async function idUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  const idUsuario = req.params.idUsuario;
  try {
    var rutero = [];
    var clientes = await Ruta.find({ idUsuario,visitado:false });
    if(clientes.length<=0){
       res.status(201).send({res:"no hay ruta asignada"});
    }
    clientes.map(async (cliente, i) => {
      const facturas = await conexionFirebird.queryDB(
        "select docuid as id, detalle, saldo, valor from documento where terid= ? and saldo>0 and codcomp='FV'",
        [cliente.idTNS]
      );
      const carteras = [];
      facturas.map(factura => {
        carteras.push({
          id: factura.ID,
          detalle: factura.DETALLE.toString(),
          saldo: factura.SALDO,
          valor: factura.VALOR
        });
      });
      const {
        _id,
        novedad,
        barrio,
        visitado,
        creado,
        nombre,
        direccion,
        idUsuario,
        idTNS,
        documento,
        telefono
      } = cliente;
      const ruta = {
        _id,
        novedad,
        barrio,
        visitado,
        creado,
        nombre,
        direccion,
        idUsuario,
        idTNS,
        documento,
        telefono,
        carteras
      };
      rutero.push(ruta);
      if (clientes.length === i + 1) {
        res.status(200).send(rutero);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function ruteroUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(req.query);
  const {idUsuario, fecha} = req.query
  const fec =Date.parse(fecha)
  
  try {
    var clientes = await Ruta.find({ idUsuario,visitado:true,creado:{"$lte": fec}});
    if(clientes.length<=0){
       res.status(201).send({res:"no hay ruta recorrida"});
    }else{
      res.status(200).send(clientes);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function agregarRutaTotal(req, res) {
  res.setHeader("Content-Type", "application/json");
  const {
  barrio,
  direccion,
  documento,
  idTNS,
  latitude,
  longitude,
  nombre,
  novedad,
  telefono,
  ultVisita,
  visitado,
  idUsuario
  } = req.body;
    
  const nuevaRuta = new Ruta({
  idUsuario,
  barrio,
  direccion,
  documento,
  idTNS,
  latitude,
  longitude,
  nombre,
  novedad,
  telefono,
  ultVisita,
  visitado
  });
  try {
    await nuevaRuta.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err });
  }
}

async function guardarRuta(req, res) {
  res.setHeader("Content-Type", "application/json");
    
  const {
    documento,
    telefono,
    nombre,
    idUsuario,
    idTNS,
    direccion,
    barrio
  } = req.body;
  const nuevaRuta = new Ruta({
    documento,
    telefono,
    nombre,
    idUsuario,
    idTNS,
    direccion,
    barrio
  });
  try {
    await nuevaRuta.save();
    res.status(200).send({ res: "Guardado Correctamente" });
  } catch (err) {
    res.status(400).send({ err:err });
  }
}

async function consultar(req, res) {
  res.setHeader("Content-Type", "application/json");
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  idUsuario,
  ruteroUsuario,
  guardarRuta,
  consultar,
  error,
  agregarRutaTotal
};
