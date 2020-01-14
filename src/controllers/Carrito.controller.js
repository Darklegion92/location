/*const Usuario = require('../models/Usuarios')
const service = require('../services/index.service')
const CONFIG = require('../config/config')
const Firebird = require('node-firebird');*/
const conexionMYSQL = require("../services/conexionMYSQL");

async function lista(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql = "SELECT * FROM sliderweb";
  await con.query(sql, async function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}

async function guardar(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  var con = conexionMYSQL.con;
  var sql = "";
  var parametros = [];
  const {
    codigoArticulo,
    nombreArticulo,
    cantidad,
    precioArticulo
  } = req.body.carItem;
  if (req.body.id) {
    sql =
      "INSERT INTO carritoitems(idCarrito,codigoItem,nombreItem,cantidadItem,valorItem) values (?,?,?,?,?)";
    parametros = [
      req.params.id,
      codigoArticulo,
      nombreArticulo,
      cantidad,
      precioArticulo
    ];
  } else {
    sql = "call carritonuevoitem(?,?,?,?)";
    parametros = [codigoArticulo, nombreArticulo, cantidad, precioArticulo];
  }
  await con.query(sql, parametros, (err, result) => {
    if (err) throw err;
    var string = JSON.stringify(result[0]);
    const id = JSON.parse(string)[0].id;
    res.status(200).send({ id });
  });
  try {
    con.release();
  } catch (e) {}
}

async function guardarNoRegistrado(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;
  const { cliente, carItems } = req.body;
  var total = 0;
  carItems.map(item => {
    total = total + item.cantidad * item.precioArticulo;
    return null;
  });
  var sql = "SELECT idCliente FROM clientes WHERE celularCliente = ?";
  var parametros = [cliente.celularCliente];
  await con.query(sql, parametros, async function(err, result) {
    if (err) throw err;
    if (result) {
      sql =
        "INSERT INTO `ordenes`(`idCliente`, `valorOrden`, `idMedioPago`, `fechaOrden`, `idSucursal`, `horaOrden`, `idUsuario`, idEstadoOrdenes) values " +
        "(?,?,1,CURDATE(),(SELECT idSucursal FROM barrios WHERE idBarrio = ?),CURTIME(),1,6);";
      parametros = [result[0].idCliente, total, cliente.idBarrio];
      await con.query(sql, parametros, function(err, result) {
        if (err) throw err;
        if (result) {
          console.log(result.insertId);
          carItems.map(item => {
            sql =
              "INSERT INTO `ordenesdetalles`( `idOrden`, `codigoArticulo`, `descripcionArticulo`, `agrupacionArticulo`, `precioArticulo`, `cantidadArticulo`)values " +
              "(?,?,?,9,?,?)";
            parametros = [
              result.insertId,
              item.codigoArticulo,
              item.nombreArticulo,
              item.precioArticulo,
              item.cantidad
            ];
            con.query(sql, parametros);
          });
          res.status(200).send({ res: true });
        }
      });
    }
  });
  try {
    con.release();
  } catch (e) {}
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  lista,
  guardar,
  guardarNoRegistrado,
  error
};
