const cliinfoForm = document.getElementById('cli-info-form')

let clientesel = document.getElementById('clientescb')
let id = document.getElementById('client-info-id')
let razonsocial = document.getElementById('client-info-razonsocial')
let segmento = document.getElementById('client-info-segmento')
let rfc = document.getElementById('client-info-rfc')
let direccion = document.getElementById('client-info-direccion')
let acnombre = document.getElementById('client-info-acnombre')
let actelefono = document.getElementById('client-info-actelefono')
let accorreo = document.getElementById('client-info-accorreo')
let apnombre = document.getElementById('client-info-apnombre')
let aptelefono = document.getElementById('client-info-aptelefono')
let apcorreo = document.getElementById('client-info-apcorreo')
let margendeganancia = document.getElementById('client-info-margendeganancia')
let credito = document.getElementById('client-info-credito')
let limitedecreditod = document.getElementById('client-info-limitedecreditod')
let limitedecreditot = document.getElementById('client-info-limitedecreditot')
let documentacion = document.getElementById('client-info-documentacion')
let licenciasanitaria = document.getElementById('client-info-licenciasanitaria')
let cedulaprofesional = document.getElementById('client-info-cedulaprofesional')
let recetamedica = document.getElementById('client-info-recetamedica')
let cuentabancaria = document.getElementById('client-info-cuentabancaria')
let claveinterbancaria = document.getElementById(
  'client-info-claveinterbancaria'
)
let banco = document.getElementById('client-info-banco')
let formadepago = document.getElementById('client-info-formadepago')

let tokenn = document.cookie.replace('tuken=', '')
let res
//cliinfoForm.addEventListener('submit', async (e) => {
document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault()
  try {
    res = await fetch('http://localhost:4000/api/clientes', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
    }).then((res) => res.json())

    //var array = res.body
    //console.log(res.body)
    //console.table(array)
    let limite = res.body.length
    let selector = document.getElementById('clientescb')

    for (let i = 0; i < limite; i++) {
      selector.options[i] = new Option(
        res.body[i].id.toString() + ': ' + res.body[i].razonsocial
      )
    }

    if (res.error) {
      throw {status: res.status, statusText: res.body, error: res.error}
    } //else location.reload()
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    console.log(message)
    setInterval(() => {
      location.reload()
    }, 4000)
  }
})

/* clientesel.addEventListener('click', async (e) => {
  alert('click en select')
}) */
async function seleccionarCliente() {
  /*let clientesel = document.getElementById('clientescb')
  let id = document.getElementById('client-info-id')
  let nombre = document.getElementById('client-info-nombre')
  let edad = document.getElementById('client-info-edad')
  let profesion = document.getElementById('client-info-profesion') */
  let cliente = clientesel.value
  let arr = cliente.split(':')

  //console.log(cliente)
  //console.log(arr[0])

  try {
    res = await fetch('http://localhost:4000/api/clientes/' + arr[0], {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
    }).then((res) => res.json())

    var array = res.body
    console.log(res.body)
    console.table(array)
    //console.log(res.body[0].id.toString())
    //console.log(res.body[0].nombre.toString())
    //console.log(res.body[0].edad)
    //console.log(res.body[0].profesion)

    id.value = res.body[0].id
    razonsocial.value = res.body[0].razonsocial
    segmento.value = res.body[0].segmento
    rfc.value = res.body[0].rfc
    direccion.value = res.body[0].direccion
    acnombre.value = res.body[0].acnombre
    actelefono.value = res.body[0].actelefono
    accorreo.value = res.body[0].accorreo
    apnombre.value = res.body[0].apnombre
    aptelefono.value = res.body[0].aptelefono
    apcorreo.value = res.body[0].apcorreo
    margendeganancia.value = res.body[0].margendeganancia
    credito.value = res.body[0].credito
    limitedecreditod.value = res.body[0].limitedecreditod
    limitedecreditot.value = res.body[0].limitedecreditot
    documentacion.value = res.body[0].documentacion
    licenciasanitaria.value = res.body[0].licenciasanitaria
    cedulaprofesional.value = res.body[0].cedulaprofesional
    recetamedica.value = res.body[0].recetamedica
    cuentabancaria.value = res.body[0].cuentabancaria
    claveinterbancaria.value = res.body[0].claveinterbancaria
    banco.value = res.body[0].banco
    formadepago.value = res.body[0].formadepago

    if (res.error) {
      throw {status: res.status, statusText: res.body, error: res.error}
    } //else location.reload()
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    console.log(message)
    setInterval(() => {
      location.reload()
    }, 4000)
  }
}

async function agregaCliente() {
  /* let clientesel = document.getElementById('clientescb')
  let id = document.getElementById('client-info-id')
  let nombre = document.getElementById('client-info-nombre')
  let edad = document.getElementById('client-info-edad')
  let profesion = document.getElementById('client-info-profesion') */
  //let cliente = clientesel.value
  //let arr = cliente.split(':')

  //console.log(cliente)
  //console.log(arr[0])

  try {
    res = await fetch('http://localhost:4000/api/clientes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
      body: JSON.stringify({
        id: 0,
        razonsocial: razonsocial.value,
        segmento: segmento.value,
        rfc: rfc.value,
        direccion: direccion.value,
        acnombre: acnombre.value,
        actelefono: actelefono.value,
        accorreo: accorreo.value,
        apnombre: apnombre.value,
        aptelefono: aptelefono.value,
        apcorreo: apcorreo.value,
        margendeganancia: parseInt(margendeganancia.value),
        credito: credito.value,
        limitedecreditod: parseInt(limitedecreditod.value),
        limitedecreditot: parseInt(limitedecreditot.value),
        documentacion: documentacion.value,
        licenciasanitaria: licenciasanitaria.value,
        cedulaprofesional: cedulaprofesional.value,
        recetamedica: recetamedica.value,
        cuentabancaria: cuentabancaria.value,
        claveinterbancaria: claveinterbancaria.value,
        banco: banco.value,
        formadepago: formadepago.value,
      }),
    }).then((res) => res.json())

    var array = res.body
    console.log(res.body)
    console.table(array)
    //console.log(res.body[0].id.toString())
    //console.log(res.body[0].nombre.toString())
    //console.log(res.body[0].edad)
    //console.log(res.body[0].profesion)

    // id.value = res.body[0].id
    // nombre.value = res.body[0].nombre
    // edad.value = res.body[0].edad
    // profesion.value = res.body[0].profesion

    if (res.error) {
      throw {status: res.status, statusText: res.body, error: res.error}
    } else location.reload()
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    console.log(message)
    setInterval(() => {
      location.reload()
    }, 4000)
  }
}

async function actualizaCliente() {
  try {
    res = await fetch('http://localhost:4000/api/clientes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
      body: JSON.stringify({
        id: id.value,
        razonsocial: razonsocial.value,
        segmento: segmento.value,
        rfc: rfc.value,
        direccion: direccion.value,
        acnombre: acnombre.value,
        actelefono: actelefono.value,
        accorreo: accorreo.value,
        apnombre: apnombre.value,
        aptelefono: aptelefono.value,
        apcorreo: apcorreo.value,
        margendeganancia: parseInt(margendeganancia.value),
        credito: credito.value,
        limitedecreditod: parseInt(limitedecreditod.value),
        limitedecreditot: parseInt(limitedecreditot.value),
        documentacion: documentacion.value,
        licenciasanitaria: licenciasanitaria.value,
        cedulaprofesional: cedulaprofesional.value,
        recetamedica: recetamedica.value,
        cuentabancaria: cuentabancaria.value,
        claveinterbancaria: claveinterbancaria.value,
        banco: banco.value,
        formadepago: formadepago.value,
      }),
    }).then((res) => res.json())

    if (res.error) {
      throw {status: res.status, statusText: res.body, error: res.error}
    } else location.reload()
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    console.log(message)
    setInterval(() => {
      location.reload()
    }, 4000)
  }
}

async function eliminaCliente() {
  try {
    res = await fetch('http://localhost:4000/api/clientes', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
      body: JSON.stringify({
        id: id.value,
      }),
    }).then((res) => res.json())

    if (res.error) {
      throw {status: res.status, statusText: res.body, error: res.error}
    } else location.reload()
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    console.log(message)
    setInterval(() => {
      location.reload()
    }, 4000)
  }
}

document.querySelector('#pdffFile').addEventListener('change', () => {
  let pdffFile = document.querySelector('#pdffFile').files[0]
  let pdffFileURL = URL.createObjectURL(pdffFile)
  console.log(pdffFile.name)

  document.querySelector('#vistaPrevia').setAttribute('src', pdffFileURL)
})
