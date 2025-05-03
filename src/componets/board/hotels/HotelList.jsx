import { useNavigate } from "react-router";
import { ButtonView } from "../../buttons/buttonView"
import { ButtonDelete } from "../../buttons/buttonDelete"
import { ButtonEdit } from "../../buttons/buttonEdit"
import { ButtonAdd } from "../../buttons/buttonAdd"
import { useHotels } from "../../../hooks/useHotels"
import { ModalHotel } from '../modals/modalHotel'
import { hotelStore } from '../../../store/hotelStore';
import { ModalEditHotel } from "../modals/modalEditHotel"
import { useState } from "react"


export const HotelList = ({ hotels }) => {
  const [dataEdit, setDataEdit] = useState({})
  const { setModalAbierto, setModalEditarHotelAbierto } = hotelStore()
  const { handleDeleteHotel } = useHotels()
  const navigate = useNavigate()

  const editHotel = ({ id }) => {
    setModalEditarHotelAbierto(true)
    setDataEdit(hotels.find(hotel => hotel.id === id))
  }

  return (
    <>
      <div className="containerTitle">
        <h3>Hotels</h3>
        <ButtonAdd handleClick={() => setModalAbierto(true)}/>
      </div>
    
      <div className="responsive-table-container">
        <table className="tabla responsive-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>Nit</th>
              <th>Número de habitaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>

            {hotels.map((hotel, index) => (
              <tr key={index} className={`hotel_${hotel.id}`}>
                <td>{hotel.name}</td>
                <td>{hotel.address}</td>
                <td>{hotel.city}</td>
                <td>{hotel.nit}</td>
                <td>{hotel.number_of_rooms}</td>
                <td className="actionsButtons">
                  <ButtonView handleClick={() => navigate(`/hotels/${hotel.slug}`)} />
                  <ButtonEdit handleClick={() => editHotel({ id: hotel.id })}/>
                  <ButtonDelete handleClick={() => handleDeleteHotel({ id: hotel.id })} />
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>

      <ModalHotel />
      <ModalEditHotel dataEdit={dataEdit} />
    </>
  )
}