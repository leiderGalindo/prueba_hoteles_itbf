export const FormHotel = ({ register }) => {
  return (
    <>
      {/* Name */}
      <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            { ...register("name") }
            required
          />
        </div>

        {/* Address */}
        <div className="input-field">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            { ...register("address") }
            required
          />
        </div>

        {/* City */}
        <div className="input-field">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            { ...register("city") }
            required
          />
        </div>

        {/* Nit */}
        <div className="input-field">
          <label htmlFor="nit">Nit</label>
          <input
            type="text"
            id="nit"
            { ...register("nit") }
            required
          />
        </div>

        {/* Number of rooms */}
        <div className="input-field">
          <label htmlFor="number_of_rooms">Number of rooms</label>
          <input
            type="number"
            id="number_of_rooms"
            { ...register("number_of_rooms") }
            required
          />
        </div>
    </>
  )
}