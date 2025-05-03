import { useHotels } from "../../../hooks/useHotels"
import { hotelStore } from "../../../store/hotelStore"
import { HotelList } from "./HotelList"
import "./index.css"

export const Hotels = () => {
  const { loading, error } = useHotels()
  const { hotels } = hotelStore()

  return (
    <div className="containerHotels">
      {loading && <p>Loading hotels...</p>}
      {!loading && hotels.length === 0 && <p>No hotels available</p>}
      {error && <p>Error: {error}</p>}
      {!loading && <HotelList hotels={hotels} />}
    </div>
  )
}