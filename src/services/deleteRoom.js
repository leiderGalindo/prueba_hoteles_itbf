const BaseUrlApi  = import.meta.env.VITE_BASE_URL_API

export const deleteRoom = async ({ token, id }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  }

  const response = await fetch(`${BaseUrlApi}/rooms/${id}`, requestOptions)

  // Validamos el resultado de la petición
  if(!response.ok) throw new Error('Error en la petición')

  const data = await response.json()

  return data
}