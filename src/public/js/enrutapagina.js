const cotinfoForm = document.getElementById('cot-info-form')
const preinfoForm = document.getElementById('pre-info-form')
const dashinfoForm = document.getElementById('dash-info-form')
const alminfoForm = document.getElementById('alm-info-form')

let tokenn = document.cookie.replace('tuken=', '')

cotinfoForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    res = await fetch('http://localhost:4000/api/cotizaciones', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
    }) //.then((res) => res.json())

    console.log(res)

    if (res.error) {
      throw {status: res.status, statusText: res.body, error: res.error}
    } else window.location = 'http://localhost:4000/api/cotizaciones'
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    console.log(message)
    setInterval(() => {
      location.reload()
    }, 4000)
  }
})

preinfoForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    resp = await fetch('http://localhost:4000/api/prefacturas', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
    }) //.then((resp) => resp.json())
    console.log(resp)
    if (resp.error) {
      throw {
        status: resp.status,
        statusText: resp.body,
        error: resp.error,
      }
    } else window.location = 'http://localhost:4000/api/prefacturas'
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    window.location = 'http://localhost:4000'
  }
})

dashinfoForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    response = await fetch('http://localhost:4000/api/dashboard', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
    }) //.then((response) => response.json())
    console.log(response)
    if (response.error) {
      throw {
        status: response.status,
        statusText: response.body,
        error: response.error,
      }
    } else window.location = 'http://localhost:4000/api/dashboard'
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    window.location = 'http://localhost:4000'
  }
})

alminfoForm.addEventListener('submit', async (e) => {
  alert('pasando por almacen')
  /*  e.preventDefault()
  try {
    response = await fetch('http://localhost:4000/api/almacen', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        authorization: tokenn,
      },
    }) //.then((response) => response.json())
    console.log(response)
    if (response.error) {
      throw {
        status: response.status,
        statusText: response.body,
        error: response.error,
      }
    } else window.location = 'http://localhost:4000/api/almacen'
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    window.location = 'http://localhost:4000'
  } */
})
