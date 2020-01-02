/*const Usuario = require('../models/Usuarios')
const service = require('../services/index.service')
const CONFIG = require('../config/config')
const Firebird = require('node-firebird');*/
const conexionMYSQL = require("../services/conexionMYSQL");

async function lista(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql =
    "SELECT valorConfiguracion FROM configuraciones where idConfiguracion = 2";
  await con.query(sql, async function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}
async function redes(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql =
    "SELECT * FROM redesSociales";
  await con.query(sql, async function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}
async function sucursal(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql =
    "SELECT * FROM sucursales";
  await con.query(sql, async function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
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
  redes,
  sucursal,
  error
};
