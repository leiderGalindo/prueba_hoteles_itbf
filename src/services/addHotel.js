const BaseUrlApi  = import.meta.env.VITE_BASE_URL_API

export const addHotel = async ({ token, newHotel }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(newHotel),
  }

  const response = await fetch(`${BaseUrlApi}/hotels`, requestOptions)

  // Validamos el resultado de la petición
  if(!response.ok) throw new Error('Error en la petición')

  const data = await response.json()

  return data
}