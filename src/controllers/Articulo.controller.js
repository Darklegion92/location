const conexionMYSQL = require("../services/conexionMYSQL");

async function lista(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;
  const sql = "SELECT * FROM `articulos` LIMIT 50";
  await con.query(sql, function(err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}

async function listaFiltrada(req, res) {
  try {
    res.setHeader("Content-Type", "application/json");
    var con = conexionMYSQL.con;
    console.log(req.query);
    
    var sql = "SELECT * FROM articulos LIMIT 50";
    var parametros = [];

    if(req.query.texto && req.query.text !== ""){
      sql = "SELECT * FROM articulos WHERE nombreArticulo LIKE ?"
      parametros = ["%"+req.query.texto+"%"]
    }
    if(req.query.marca && req.query.marca !== ""){
      sql = "SELECT * FROM articulos WHERE nombreMarca = ?"
      parametros = [req.query.marca]
    }
    if((req.query.familia && req.query.familia !== "")){
      sql = "SELECT * FROM articulos WHERE nombreFamilia = ?"
      parametros = [req.query.familia,req.query.grupo]
    }
    if((req.query.familia && req.query.familia !== "") && (req.query.grupo && req.query.grupo !== "")){
      sql = "SELECT * FROM articulos WHERE nombreFamilia = ? AND nombreGrupo = ?"
      parametros = [req.query.familia,req.query.grupo]
    }
    if((req.query.familia && req.query.familia !== "") && (req.query.texto && req.query.texto !== "")){
      sql = "SELECT * FROM articulos WHERE nombreFamilia = ? AND nombreArticulo LIKE ?"
      parametros = [req.query.familia,"%"+req.query.texto+"%"]
    }
     if((req.query.familia && req.query.familia !== "") && (req.query.texto && req.query.texto !== "") && (req.query.grupo && req.query.grupo !== "")){
      sql = "SELECT * FROM articulos WHERE nombreFamilia = ? AND nombreArticulo LIKE ? AND nombreGrupo = ?"
      parametros = [req.query.familia,"%"+req.query.texto+"%",req.query.grupo]
    }
    
    await con.query(sql, parametros, function(err, result) {
      if (err) throw err;
      res.status(200).send(result);
    });

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
  listaFiltrada,
  familia,
  grupo,
  subgrupo,
  agrupaciones,
  error
};
