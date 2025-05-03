const BaseUrlApi  = import.meta.env.VITE_BASE_URL_API

export const login = async ({ email, password }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const params = JSON.stringify({
    email,
    password
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: params,
  }
  return await fetch(`${BaseUrlApi}/auth/login`, requestOptions)
  .then(async res => {
    if (!res.ok) throw new Error('Error en la petición')
    return await res.json()
  })
  .then(res => {
    return res
  })
  .catch(error => {
    console.log('Error en la petición', error)
  })
}