import React, { useEffect, useState } from "react";

function ShippingPlaces({ countries, setObj, obj, name }) {
  //countries,

  const [places, setPlaces] = useState([]);

  function remove(event) {
    let data = [...places];
    data.splice(event.target.id, 1);

    setPlaces(data);
  }

  useEffect(() => {
    setObj((prev) => {
      return {
        ...prev,
        [name]: places,
      };
    });

    return () => {
      let itemObj = obj;

      delete itemObj[name];

      if (name === "shippingList") {
        delete itemObj.shippingFee;
      } else {
        delete itemObj.deliveryFee;
      }

      setObj(itemObj);
    };
  }, [places]);

  function handleChange(event) {
    if (!places.includes(event.target.value)) {
      setPlaces((prev) => [...prev, event.target.value]);
    } else {
      alert("Already Selected.");
    }
  }

  return (
    <div className="list-container">
      <h3>
        {name === "shippingList"
          ? "Shipping Available In: "
          : "Delivery Available In:"}
      </h3>
      <ul>
        {places.map((place, index) => {
          return (
            <li key={index}>
              {place}
              <button id={index} className="remove-btn  .." onClick={remove}>
                <img
                  className="rm-btn-img"
                  src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
                  alt="remove"
                />
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <select
          className="select-list"
          name="country"
          defaultValue="Select Country Available for Shipping"
          onChange={handleChange}
        >
          <option disabled>Select Country Available for Shipping</option>
          {countries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default ShippingPlaces;
