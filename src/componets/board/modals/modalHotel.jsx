import { useForm } from "react-hook-form"
import { Modal } from '../../Modal';
import { useHotels } from "../../../hooks/useHotels"
import { hotelStore } from "../../../store/hotelStore";
import { FormHotel } from "../hotels/FormHotel";


export const ModalHotel = () => {
  const { modalAbierto, setModalAbierto } = hotelStore()
  const { handleAddHotel, error, loading } = useHotels()
  const { register, handleSubmit, reset } = useForm();
  
  const resetForm = () => {
    reset()
  }

  const onSubmit = async (data) => {
    handleAddHotel(data, resetForm)
  }
  return (
    <>
      <Modal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        title="Create new hotel"
      >
        <form onSubmit={handleSubmit(onSubmit)} id="hotelForm">
          <FormHotel register={register} />

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