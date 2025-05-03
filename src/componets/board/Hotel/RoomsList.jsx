import { useState } from "react"
import { ButtonDelete } from "../../buttons/buttonDelete"
import { ButtonEdit } from "../../buttons/buttonEdit"
import { ButtonAdd } from "../../buttons/buttonAdd"
import { ModalRoom } from '../modals/modalRoom'
import { hotelStore } from '../../../store/hotelStore';
import { ModalEditRoom } from "../modals/modalEditRoom"
import { useRoom } from "../../../hooks/useRoom";


export const RoomsList = ({ rooms, hotelId }) => {
  const [dataEdit, setDataEdit] = useState({})
  const { setModalAbierto, setModalEditarHotelAbierto } = hotelStore()
  const { handleDeleteRoom } = useRoom()

  const editRoom = ({ id }) => {
    setModalEditarHotelAbierto(true)
    setDataEdit(rooms.find(hotel => hotel.id === id))
  }

  return (
    <>
      <div className="containerTitle" style={{ marginTop: '20px' }}>
        <h3>Rooms</h3>
        <ButtonAdd handleClick={() => setModalAbierto(true)}/>
      </div>
    
      <table className="tabla" style={{ margin: '0px' }}>
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Accommodation</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {rooms.map((room, index) => (
            <tr key={index} className={`room_${room.id}`}>
              <td>{room.room_type}</td>
              <td>{room.accommodation}</td>
              <td>{room.quantity}</td>
              <td className="actionsButtons">
                <ButtonEdit handleClick={() => editRoom({ id: room.id })}/>
                <ButtonDelete handleClick={() => handleDeleteRoom({ id: room.id })} />
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>

      <ModalRoom hotelId={hotelId} />
      <ModalEditRoom dataEdit={dataEdit} />
    </>
  )
}