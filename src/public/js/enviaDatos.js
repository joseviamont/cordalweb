//const {jwt} = require('../../config')

//import contactFormLogin from './dom/validaciones_formulario.js'
const d = document,
  $form = d.querySelector('.login-form')

//document.cookie = 'nombre=oeschgerae'
//let res

d.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    //console.log('antes del fetch')
    let res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        usuario: e.target.usuario.value,
        password: e.target.password.value,
      }),
    }).then((res) => res.json())

    /* alert(res.status)
    alert(res.error)
    alert(res.body) */

    document.cookie =
      'tuken=' + res.body + '; expires=Thu, 31 Dec 2023 12:00:00 UTC; path=/;'

    /* const cookiesOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    res.cookie('jwto', res.body, cookiesOptions) */
    //localStorage.setItem('tuken', res.body)

    /* tokenn = res.status
    console.log(tokenn) */
    if (res.error) {
      throw {status: res.status, statusText: res.body, error: res.error}
    } else {
      window.location = 'http://localhost:4000/pagmain'
      //location.reload()
    }
  } catch (error) {
    let message = error.statusText || 'Ocurrió un error'
    console.log(message)

    $form.insertAdjacentHTML(
      'afterend',
      `<p><b>Error ${error.status}: ${message}</b></p>`
    )
    setInterval(() => {
      location.reload()
    }, 4000)
  }
})
