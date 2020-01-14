const conexionMYSQL = require("../services/conexionMYSQL");

async function id(req, res) {
  res.setHeader("Content-Type", "application/json");
  var con = conexionMYSQL.con;
  const sql = "SELECT idCliente FROM clientes WHERE idFacebook = ?";
  const parametros = [req.params.id];
  await con.query(sql, parametros, function(err, result) {
    if (err) throw err;
    if (result) res.status(200).send(result);
    res.status(201);
  });
  try {
    con.release();
  } catch (e) {}
}
async function grabarUsuario(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { cliente } = req.body;
  var con = conexionMYSQL.con;
  const sql =
    "INSERT INTO clientes(`documentoCliente`, `idTipoDocumento`, `nombresCliente`, `apellidosCliente`, `direccionCliente`, `idBarrio`,  `celularCliente`, `correoCliente`, `idGenero`, `fechaCliente`, `idUsuario`, `idFacebook`) " +
    "values(?,?,?,?,?,?,?,?,?,CURDATE(),?,?)";
  const parametros = [
    cliente.documentoCliente,
    1,
    cliente.nombresCliente,
    "Movil",
    cliente.direccionCliente,
    cliente.idBarrio,
    cliente.celularCliente,
    cliente.correoCliente,
    1,
    1,
    cliente.idFacebook
  ];
  await con.query(sql, parametros, function(err, result) {
    if (err) throw err;
    console.log(result);

    res.status(200).send(result);
  });
  try {
    con.release();
  } catch (e) {}
}
async function login(req, res) {
  res.setHeader("Content-Type", "application/json");

  var con = conexionMYSQL.con;
  const sql = "SELECT * FROM clientes WHERE correoCliente = ?";
  const parametros = [req.query.correo];
  await con.query(sql, parametros, function(err, result) {
    if (err) throw err;
    if (result) res.status(200).send(result);
    res.status(201);
  });
  try {
    con.release();
  } catch (e) {}
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  id,
  grabarUsuario,
  login,
  error
};
