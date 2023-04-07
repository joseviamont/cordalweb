const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const cookieParser = require('cookie-parser')
const cookie = require('cookie')
const path = require('path')

const clientes = require('./modulos/clientes/rutas')
const usuarios = require('./modulos/usuarios/rutas')
const auth = require('./modulos/auth/rutas')
const cotizaciones = require('./modulos/cotizaciones/rutas')
const prefacturas = require('./modulos/prefacturas/rutas')
const dashboard = require('./modulos/dashboard/rutas')
const almacen = require('./modulos/almacen/rutas')
const error = require('./red/errors')

const seguridad = require('./modulos/usuarios/seguridad')

const app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

//Seteamos el motor de plantillas
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))

//Seteamos la carpeta Public para archivos estáticos
//app.use(express.static('public'))
app.use('/api/clientes', express.static(path.join(__dirname, 'public')))
app.use('/api/clientes/todos', express.static(path.join(__dirname, 'public')))
app.use('/api/usuarios', express.static(path.join(__dirname, 'public')))
app.use('/api/auth', express.static(path.join(__dirname, 'public')))
app.use('/api/cotizaciones', express.static(path.join(__dirname, 'public')))
app.use('/api/prefacturas', express.static(path.join(__dirname, 'public')))
app.use('/api/dashboard', express.static(path.join(__dirname, 'public')))
app.use('/api/almacen', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, 'public')))
//app.use('/src', express.static('public'))

//Para poder trabajar con las cookies
app.use(cookieParser())

//Middleware
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//configuración
app.set('port', config.app.port)

//rutas
app.use('/api/clientes', clientes)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)
app.use('/api/cotizaciones', cotizaciones)
app.use('/api/prefacturas', prefacturas)
app.use('/api/dashboard', dashboard)
app.use('/api/almacen', almacen)

app.get('/', (req, res) => {
  res.render('login')
})

// Agregar seguridad
app.use('/reg', seguridad(), require('./modulos/usuarios/index.routes'))
// Agregar seguridad
app.get('/pagmain', seguridad(), (req, res) => {
  res.render('pagmain')
})

app.get('/logout', (req, res) => {
  res.clearCookie('tuken')
  return res.redirect('/')
})

//Para eliminar el cache y que no se pueda volver con el botón de back luego de que hacemos un LOGOUT
app.use(function (req, res, next) {
  if (req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  next()
})
app.use(error)

//Prueba de pug
/* app.get('/log/v', (req, res) => {
  res.render('login')
}) */

module.exports = app
