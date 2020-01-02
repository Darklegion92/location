/*const Usuario = require('../models/Usuarios')
const service = require('../services/index.service')
const CONFIG = require('../config/config')
const Firebird = require('node-firebird');*/
const conexionMYSQL = require("../services/conexionMYSQL");

async function lista(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql =
    "SELECT * FROM seccionesweb";
  await con.query(sql, async function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}

async function marcas(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql =
    "SELECT * FROM marcas ORDER BY nombreMarca";
  await con.query(sql, async function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}

async function familia(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;
  console.log(req.params.nombre);

  const sql = "SELECT * FROM `articulos` WHERE familiaArticulo = ?";
  await con.query(sql, [req.params.nombre], function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}

async function grupo(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql = "SELECT * FROM `articulos` WHERE grupoArticulo = ?";
  await con.query(sql, [req.params.nombre], function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}

async function subgrupo(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql = "SELECT * FROM `articulos` WHERE subgrupoArticulo = ?";
  await con.query(sql, [req.params.nombre], function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}

async function agrupaciones(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql = "SELECT * FROM `" + req.params.nombre + "` ";
  await con.query(sql, function(err, result) {
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
  familia,
  grupo,
  subgrupo,
  agrupaciones,
  marcas,
  error
};
