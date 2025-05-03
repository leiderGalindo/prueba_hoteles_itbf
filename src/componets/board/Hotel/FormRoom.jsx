export const FormRoom = ({ register }) => {
  return (
    <>
      {/* room_type */}
      <div className="input-field">
          <label htmlFor="room_type">Room type</label>
          <select name="room_type" id="room_type" { ...register("room_type") } required>
            <option value="ESTANDAR">Estandar</option>
            <option value="JUNIOR">Junior</option>
            <option value="SUITE">Suite</option>
          </select>
        </div>

        {/* accommodation */}
        <div className="input-field">
          <label htmlFor="accommodation">Accommodation</label>
          <select name="accommodation" id="accommodation" { ...register("accommodation") } required>
            <option value="SENCILLA">Sencilla</option>
            <option value="DOBLE">Doble</option>
            <option value="TRIPLE">Triple</option>
            <option value="CUADRUPLE">Cuadruple</option>
          </select>
        </div>

        {/* quantity */}
        <div className="input-field">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            { ...register("quantity") }
            required
          />
        </div>

        <input
          type="hidden"
          id="hotel_id"
          { ...register("hotel_id") }
          required
        />
    </>
  )
}