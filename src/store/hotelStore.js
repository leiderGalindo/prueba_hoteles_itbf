import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const hotelStore = create(persist(
  (set, get) => ({
    rooms: [],
    hotels: [],
    modalAbierto: false,
    modalEditarHotelAbierto: false,
    setModalAbierto: (modalAbierto) => {
      set({ modalAbierto })
    },
    setModalEditarHotelAbierto: (modalEditarHotelAbierto) => {
      set({ modalEditarHotelAbierto })
    },
    setHotels: (hotels) => {
      set({ hotels })
    },
    addHotel: (newHotel) => {
      const { hotels } = get()
      set({ hotels: [...hotels, newHotel] })
    },
    editHotel: (updatedHotel) => {
      const { hotels } = get()
      
      const index = hotels.findIndex(item => item.id === updatedHotel.id)
      hotels[index] = { ...hotels[index], ...updatedHotel }
      
      set({ hotels })
    },


    setRooms: (rooms) => {
      set({ rooms })
    },
    addRoom: (newRoom) => {
      const { rooms } = get()
      set({ rooms: [...rooms, newRoom] })
    },
    editRoom: (updatedRoom) => {
      const { rooms } = get()
      
      const index = rooms.findIndex(item => item.id === updatedRoom.id)
      rooms[index] = { ...rooms[index], ...updatedRoom }
      
      set({ rooms })
    },
    
  }),{
    name: 'hotels', // unique name
  }
))