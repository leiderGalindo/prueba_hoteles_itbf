import { useState, useEffect } from "react"
import { toast } from 'sonner'
import { useAuthStore } from "../store/auth"
import { getHotels } from "../services/getHotels"
import { deleteHotel } from "../services/deleteHotel"
import { addHotel } from "../services/addHotel"
import { editHotel } from "../services/editHotel"
import { hotelStore } from "../store/hotelStore"

export const useHotels = () => {
  const { 
    setModalAbierto, 
    setModalEditarHotelAbierto, 
    addHotel: addHotels, 
    editHotel: editHotels, 
    setHotels 
  } = hotelStore()
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  const token = useAuthStore(state => state.token)

  // Realiza la eliminación de un hotel
  const handleDeleteHotel = ({ id = false }) => {
    if(!id) return false

    toast('Are you sure to eliminate this hotel', {
      action: {
        label: 'yes, Delete',
        onClick: () => {
          toast.promise(
            new Promise((resolve, reject) => {
              deleteHotel({ token, id })
                .then(data => {
                  console.log(data);
                  
                  if((data.error ?? '') != '') 
                    reject(data.error);
      
                  if((data.message ?? '') != '') {
                    document.querySelector(`.hotel_${id}`).remove()
                    resolve(data.message);
                  }
                })
                .catch(err => {
                  console.log(err)
                  reject(err.message);
                })
            }),
            {
              loading: 'Hotel eliminating...',
              success: (msg) => msg,
              error: (msg) => msg,
            }
          );
        },
      },
    });
  }

  // Realiza la creación de un nuevo hotel
  const handleAddHotel = async (data, resetForm) => {
    setLoading(true)
    toast.promise(
      new Promise((resolve, reject) => {
        addHotel({ token, newHotel: data })
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

              const hotelCreated = data.hotel;
              addHotels(hotelCreated)
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

  const handleEditHotel = async (data, resetForm) => {
    setLoading(true)
    toast.promise(
      new Promise((resolve, reject) => {
        editHotel({ token, id: data.id, updatedHotel: data })
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

              const hotelEdited = data.hotel;
              editHotels(hotelEdited)
              
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

  useEffect(() => {
    getHotels({ token })
      .then(data => {
        setHotels(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(err.message)
        setLoading(false)
      })
      
  }, [])

  return { 
    loading, 
    error,
    handleDeleteHotel,
    handleAddHotel,
    handleEditHotel,
  };
}