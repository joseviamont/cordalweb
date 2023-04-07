const express = require('express')

const fs = require('fs')

const respuesta = require('../../red/respuestas')
const controlador = require('./index')
const seguridad = require('../usuarios/seguridad')

const router = express.Router()

router.get('/', seguridad(), todos)
router.get('/:id', uno)
router.post('/', agregar)
router.put('/', eliminar)
router.get('/todos/all', seguridad(), (req, res) => {
  return res.render('clientes')
})
//router.get('/todos/all', seguridad(), todos)

async function todos(req, res, next) {
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
  try {
    const items = await controlador.agregar(req.body)
    if (req.body.id == 0) {
      mensaje = 'Item guardado con exito'
      let rsocial = req.body.razonsocial.replace(/ /g, '')
      fs.mkdirSync(`./src/uploads/${rsocial}/`, {recursive: true})
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
}

module.exports = router
