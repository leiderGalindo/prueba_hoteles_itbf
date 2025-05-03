import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRoom } from "../../../hooks/useRoom";
import { hotelStore } from "../../../store/hotelStore"
import { ButtonAdd } from "../../buttons/buttonAdd"
import "./index.css"
import { RoomsList } from "./RoomsList";

const DetailHotel = ({ hotel }) => {
  return (
    <div className="containerDetailHotel">
      <h3>{hotel.name}</h3>
      <div className="detailHotel__info">
        <span>
          <b>Address:</b> {hotel.address}
        </span>
        <span>
          <b>City</b> {hotel.city}
        </span>
        <span>
          <b>Nit:</b> {hotel.nit}
        </span>
        <span>
          <b>Number of rooms:</b> {hotel.number_of_rooms}
        </span>
      </div>
    </div>
  )
}

export const Hotel = () => {
  const [ dataHotel, setDataHotel ] = useState({})
  const { loading, error, getHotelRooms } = useRoom()
  const { hotels, rooms } = hotelStore()
  const { slug } = useParams()
  const hotel = hotels.find(hotel => hotel.slug === slug)
  console.log(slug);

  useEffect(() => {
    if(slug){
      setDataHotel(hotel)

      getHotelRooms({ hotelId: hotel.id })
    }
  }, [slug])
  
  return (
    <div className="containerHotels">
      {loading && <p>Loading hotel details...</p>}
      {!loading && !dataHotel && <p>There is no hotel information</p>}
      {error && <p>Error: {error}</p>}
      {!loading && dataHotel && <DetailHotel hotel={dataHotel} />} 
      {!loading && <RoomsList rooms={rooms} hotelId={hotel.id} />}
    </div>
  ) 
}