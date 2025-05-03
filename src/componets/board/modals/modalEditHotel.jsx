import { useForm } from "react-hook-form";
import { Modal } from '../../Modal/index';
import { useHotels } from "../../../hooks/useHotels";
import { hotelStore } from "../../../store/hotelStore"
import { FormHotel } from "../hotels/FormHotel";
import { useEffect } from "react";

export const ModalEditHotel = ({ dataEdit }) => {
  const { modalEditarHotelAbierto, setModalEditarHotelAbierto } = hotelStore()
  const { handleEditHotel, error, loading } = useHotels()
  const { register, handleSubmit, reset } = useForm();
  
  const resetForm = () => {
    reset()
  }

  const onSubmit = async (data) => {
    console.log(data);
    
    handleEditHotel(data, resetForm)
  }

  useEffect(() => {
    if (dataEdit) {
      reset(dataEdit); // 🔄 Carga los datos en el formulario
    }
  }, [dataEdit, reset]);

  return (
    <>
      <Modal
        isOpen={modalEditarHotelAbierto}
        onClose={() => setModalEditarHotelAbierto(false)}
        title="Edit hotel"
      >
        <form onSubmit={handleSubmit(onSubmit)} id="hotelForm">
          <FormHotel register={register} />
          <input
              type="hidden"
              id="id"
              { ...register("id") }
              required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setModalEditarHotelAbierto(false)}>Cancel</button>
            <button
              type="submit"
              disabled={loading}
              style={{ marginLeft: '10px', background: 'green', color: 'white' }}
            >
              Save
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </Modal>
    </>
  )
}