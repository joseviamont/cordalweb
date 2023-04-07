//const connection = require('../../dbConnection/connection')
//const conn=connection()
const mysql = require('mysql')
const config = require('../../config')

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let conn

function conMysql() {
  conn = mysql.createConnection(dbconfig)

  conn.connect((err) => {
    if (err) {
      console.log('[db err]', err)
      setTimeout(conMysql, 200)
    } else {
      console.log('DB Conectada!!!')
    }
  })

  conn.on('error', (err) => {
    console.log('[db err]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      conMysql()
    } else {
      throw err
    }
  })
}

conMysql()

const controller = {}

/* controller.index = (req, res, next) => {
  conn.query('SELECT * FROM ejemplo.usuarios', (err, results, fields) => {
    if (err) next(new Error(err))
    else {
      console.log(fields)
      console.log(results)
      res.render('register', {allUsers: results})
    }
  })
} */

controller.index = (req, res, next) => {
  conn.query(
    'SELECT usuarios.id, usuarios.nombre, usuarios.activo, auth.id, auth.usuario FROM usuarios, auth WHERE usuarios.id=auth.id',
    (err, rows) => {
      if (err) next(new Error(err))
      else {
        console.log(rows)
        res.render('register', {allUsers: rows})
      }
    }
  )
}

/* controller.addUser = (req, res, next) => {
  console.log('paso por add-user de index.controller')
  console.log(req.body)
  conn.query('INSERT INTO usuarios SET ?', [req.body], (err, rows) => {
    if (err) next(new Error(err))
    res.redirect('/')
  })
} */

controller.updateUser = (req, res, next) => {
  conn.query(
    'UPDATE usuarios SET ? WHERE id = ?',
    [req.body, req.params.userId],
    (err, rows) => {
      if (err) next(new Error(err))
      res.redirect('/')
    }
  )
}

controller.deleteUser = (req, res, next) => {
  conn.query(
    'DELETE FROM usuarios WHERE id = ?',
    [req.params.userId],
    (err, rows) => {
      if (err) next(new Error(err))
      res.send({ok: true})
    }
  )
}
module.exports = controller
