const express = require('express')

const seguridad = require('../usuarios/seguridad')
const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router()

//router.get('/', seguridad(), todos)
//router.get('/', todos)
//router.get('/:id', uno)
//router.post('/', seguridad(), agregar)
//router.post('/', agregar)
//router.put('/', seguridad(), eliminar)
router.get('/', seguridad(), (req, res) => {
  res.render('dashboard')
})

/* async function todos(req, res, next) {
  try {
    const items = await controlador.todos()
    respuesta.success(req, res, items, 200)
  } catch (err) {
    next(err)
  }
}

async function uno(req, res, next) {
  try {
    const items = await controlador.uno(req.params.id)
    respuesta.success(req, res, items, 200)
  } catch (err) {
    next(err)
  }
}

async function agregar(req, res, next) {
  console.log(req.body)
  try {
    const items = await controlador.agregar(req.body)
    if (req.body.id == 0) {
      mensaje = 'Item guardado con exito'
    } else {
      mensaje = 'Item actualizado con exito'
    }
    respuesta.success(req, res, mensaje, 201)
  } catch (err) {
    next(err)
  }
}

async function eliminar(req, res, next) {
  try {
    const items = await controlador.eliminar(req.body)
    respuesta.success(req, res, 'Item elimnado satisfactoriamente', 200)
  } catch (err) {
    next(err)
  }
} */

module.exports = router
