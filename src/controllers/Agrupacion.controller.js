/*const Usuario = require('../models/Usuarios')
const service = require('../services/index.service')
const CONFIG = require('../config/config')
const Firebird = require('node-firebird');*/
const conexionMYSQL = require("../services/conexionMYSQL");

async function lista(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;

  const sql =
    "SELECT nombreFamilia,f.codigoFamilia,imgFamilia,codigoGrupo,nombreGrupo FROM familias f, grupos g where f.codigoFamilia = g.codigoFamilia";
  await con.query(sql, async function(err, result) {
    if (err) throw err;
    let rest = await result.reduce((prev, current, index, arr) => {
      // Compruebo si ya existe el elemento
      let exists = prev.find(x => x.codigoFamilia === current.codigoFamilia);
      // Si no existe lo creo con un array vacío en VALOR
      if (!exists) {
        exists = {
          codigoFamilia: current.codigoFamilia,
          nombreFamilia: current.nombreFamilia,
          imgFamilia: current.imgFamilia,
          grupos: [
            {
              codigoGrupo: current.codigoGrupo,
              nombreGrupo: current.nombreGrupo,
              
            }
          ]
        };
        prev.push(exists);
      }
      
      if (current.codigoGrupo != null) {
       
        let grupo = {
          codigoGrupo: current.codigoGrupo,
          nombreGrupo: current.nombreGrupo
        };
        exists.grupos.push(grupo);
      }
      return prev;
    }, []);

    res.status(200).send(rest);
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
  error
};
