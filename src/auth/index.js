const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../middleware/errors')

const secret = config.jwt.secret

function asignarToken(data) {
  return jwt.sign(data, secret)
}

function verificarToken(token) {
  return jwt.verify(token, secret)
}

const chequearToken = {
  //confirmarToken: function (req, id) {
  confirmarToken: function (req) {
    const decoficado = decodificarCabecera(req)

    /* if (decoficado.id !== id) {
      throw error('No tienes privilegios para hacer esto.', 401)
    } */
  },
}

function obtenerToken(autorizacion) {
  console.log(autorizacion)
  if (!autorizacion) {
    throw error('No viene token', 401)
  }

  /* if (autorizacion.indexOf('Bearer') === -1) {
    throw error('Formato invalido', 401)
  } */

  let token = autorizacion.replace('Bearer ', '')

  return token
}

function decodificarCabecera(req) {
  const autorizacion = req.headers.authorization || req.cookies.tuken
  const token = obtenerToken(autorizacion)
  const decodificado = verificarToken(token)

  req.user = decodificado

  return decodificado
}

module.exports = {
  asignarToken,
  chequearToken,
}
