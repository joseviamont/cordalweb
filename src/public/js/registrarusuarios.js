const userInfoForm = document.getElementById('user-info-form')
const userName = document.getElementById('user-info-name')
const userSurname = document.getElementById('user-info-surname')
const userEmail = document.getElementById('user-info-email')

const contentUsers = document.getElementById('content-users')
const userInfo = document.getElementById('user-info')
const userInfoTitle = document.getElementById('user-info-title')
const userInfoButton = document.getElementById('user-info-button')

contentUsers.addEventListener('click', (e) => {
  if (e.target.classList.contains('button--edit')) {
    userInfoTitle.textContent = 'Update-User'
    userName.value = e.target.parentElement.children[0].textContent
    userSurname.value = e.target.parentElement.children[1].textContent
    userEmail.value = e.target.parentElement.children[2].textContent
    userInfoButton.textContent = 'Update User'
    userInfoForm.action = `/update-user/${e.target.parentElement.dataset.id}`
  } else if (e.target.classList.contains('button--delete')) {
    fetch(`/delete-user/${e.target.parentElement.dataset.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) location.reload()
      })
  }
})

userInfo.addEventListener('click', (e) => {
  if (e.target.classList.contains('button--cancel')) {
    userInfoTitle.textContent = 'New User'
    userInfoButton.textContent = 'Add user'
    userInfoForm.action = '/add-user'
    //userInfoForm.action = '/'
    userName.value = ''
    userSurname.value = ''
    userEmail.value = ''
  }
  console.log('pasó por click cancel')
})

userInfoForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (
    userName.value.trim() != '' &&
    userSurname.value.trim() != '' // &&
    //userEmail.value.trim() != ''
  ) {
    //e.target.submit()
    try {
      //alert(document.cookie)
      let tokenn = document.cookie.replace('tuken=', '')
      //alert(tokenn)
      res = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          authorization: tokenn,
        },
        body: JSON.stringify({
          id: 0,
          nombre: e.target.nombre.value,
          usuario: e.target.usuario.value,
          password: e.target.password.value,
          activo: e.target.activo.value,
        }),
      }).then((res) => res.json())

      //console.log(data)
      //console.log(res.cookies)

      if (res.error) {
        throw {status: res.status, statusText: res.body, error: res.error}
      } else location.reload()
    } catch (error) {
      let message = error.statusText || 'Ocurrió un error'
      console.log(message)
      setInterval(() => {
        location.reload()
      }, 4000)
      // $form.insertAdjacentHTML(
      //   'afterend',
      //   `<p><b>Error ${err.status}: ${message}</b></p>`
      // )
    }
  }
})

console.log('pasó por scripts-min')
