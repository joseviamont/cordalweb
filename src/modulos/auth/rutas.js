const express = require('express')

const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router()

router.post('/login', login)

async function login(req, res, next) {
  console.log(
    req.body.usuario + '-' + req.body.password + ' en la funcion login'
  )
  console.log(req.body)
  try {
    const token = await controlador.login(req.body.usuario, req.body.password)
    /* const cookiesOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    res.cookie('jwto', token, cookiesOptions) */
    respuesta.success(req, res, token, 200)

    console.log(token)
    console.log('ingreso exitoso')
  } catch (err) {
    next(err)
  }
}
module.exports = router
