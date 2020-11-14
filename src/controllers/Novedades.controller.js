const Novedades = require('../models/Novedades.model')

/*Genera el rutero del dia para el cliente
 *Requiere: parametro de idUsuario y diaSemana
 */
async function consultar (req, res) {
  res.setHeader('Content-Type', 'application/json')
  //consula la tabla de novedaes
  try {
    var novedades = await Novedades.find()
    if (novedades.length > 0) {
      res.status(200).send(novedades)
    } else {
      res.status(201).send(novedades)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ err })
  }
}

/*
 *Toda ruta no existente se redirecciona a esta URL
 */
function error (req, res) {
  res.status(404).send({ error: 'Página no encontrada' })
}

module.exports = {
  consultar,
  error
}
