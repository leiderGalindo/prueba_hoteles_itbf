import { useState } from "react"
import { useAuthStore } from "../store/auth"
import { getRooms } from "../services/getRooms"
import { hotelStore } from "../store/hotelStore"
import { toast } from "sonner"
import { addRoom } from "../services/addRoom"
import { editRoom } from "../services/editRoom"
import { deleteRoom } from "../services/deleteRoom"

export const useRoom = () => {
  const { 
      setModalAbierto, 
      setModalEditarHotelAbierto, 
      addRoom: addRooms, 
      editRoom: editRooms, 
      setRooms 
  } = hotelStore()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const token = useAuthStore(state => state.token)

  // Realiza la creación de un nuevo hotel
  const handleAddRoom = async (data, resetForm) => {
    setLoading(true)
    toast.promise(
      new Promise((resolve, reject) => {
        addRoom({ token, newRoom: data })
          .then(data => {
            
            if((data.error ?? '') != '') {
              if(typeof data.error === 'object'){
                data.error = (Object.values(data.error)).join(', ');
              }

              setLoading(false)
              reject(data.error);
            }

            if((data.message ?? '') != '') {
              setLoading(false) 

              const roomCreated = data.room;
              addRooms(roomCreated)
              setModalAbierto(false)
              resolve(data.message);
              resetForm()
            }
          })
          .catch(err => {
            console.log(err)
            setLoading(false) 
            reject(err.message);
          })
      }),
      {
        loading: 'Saving information...',
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  }

  const handleEditRoom = async (data, resetForm) => {
    setLoading(true)
    toast.promise(
      new Promise((resolve, reject) => {
        editRoom({ token, id: data.id, updatedRoom: data })
          .then(data => {
            
            if((data.error ?? '') != '') {
              if(typeof data.error === 'object'){
                data.error = (Object.values(data.error)).join(', ');
              }

              setLoading(false)
              reject(data.error);
            }

            if((data.message ?? '') != '') {
              setLoading(false) 

              const roomEdited = data.room;
              editRooms(roomEdited)
              
              setModalEditarHotelAbierto(false)
              resolve(data.message);
              resetForm()
            }
          })
          .catch(err => {
            console.log(err)
            setLoading(false) 
            reject(err.message);
          })
      }),
      {
        loading: 'Saving information...',
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  }
  
  // Realiza la eliminación de un hotel
  const handleDeleteRoom = ({ id = false }) => {
    if(!id) return false

    toast('Are you sure to eliminate this room', {
      action: {
        label: 'yes, Delete',
        onClick: () => {
          toast.promise(
            new Promise((resolve, reject) => {
              deleteRoom({ token, id })
                .then(data => {
                  
                  if((data.error ?? '') != '') 
                    reject(data.error);
      
                  if((data.message ?? '') != '') {
                    document.querySelector(`.room_${id}`).remove()
                    resolve(data.message);
                  }
                })
                .catch(err => {
                  console.log(err)
                  reject(err.message);
                })
            }),
            {
              loading: 'Room eliminating...',
              success: (msg) => msg,
              error: (msg) => msg,
            }
          );
        },
      },
    });
  }

  const getHotelRooms = ({ hotelId }) => {
    console.log(hotelId);
    
    getRooms({ token, hotelId })
      .then(data => {
        setRooms(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(err.message)
        setLoading(false)
      })
  }

  return { 
    loading, 
    error,
    getHotelRooms,
    handleAddRoom,
    handleEditRoom,
    handleDeleteRoom,
  };
}