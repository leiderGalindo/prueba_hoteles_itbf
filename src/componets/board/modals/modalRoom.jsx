import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Modal } from '../../Modal';
import { hotelStore } from "../../../store/hotelStore";
import { FormRoom } from "../Hotel/FormRoom";
import { useRoom } from "../../../hooks/useRoom";


export const ModalRoom = ({ hotelId }) => {
  const { modalAbierto, setModalAbierto } = hotelStore()
  const { handleAddRoom, error, loading } = useRoom()
  const { register, handleSubmit, reset } = useForm();
  
  const resetForm = () => {
    reset()
  }

  const onSubmit = async (data) => {
    handleAddRoom(data, resetForm)
  }

  
  useEffect(() => {
    if (hotelId) {
      reset({ hotel_id: hotelId }); // 🔄 Carga los datos en el formulario
    }
  }, [hotelId, reset]);

  return (
    <>
      <Modal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        title="Create new room"
      >
        <form onSubmit={handleSubmit(onSubmit)} id="hotelForm">
          <FormRoom register={register} />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setModalAbierto(false)}>Cancel</button>
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