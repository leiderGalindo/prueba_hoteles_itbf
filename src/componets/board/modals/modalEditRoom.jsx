import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from '../../Modal/index';
import { hotelStore } from "../../../store/hotelStore"
import { FormRoom } from "../Hotel/FormRoom";
import { useRoom } from "../../../hooks/useRoom";

export const ModalEditRoom = ({ dataEdit }) => {
  const { modalEditarHotelAbierto, setModalEditarHotelAbierto } = hotelStore()
  const { handleEditRoom, error, loading } = useRoom()
  const { register, handleSubmit, reset } = useForm();
  
  const resetForm = () => {
    reset()
  }

  const onSubmit = async (data) => {
    handleEditRoom(data, resetForm)
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
        title="Edit room"
      >
        <form onSubmit={handleSubmit(onSubmit)} id="hotelForm">
          <FormRoom register={register} />
  
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