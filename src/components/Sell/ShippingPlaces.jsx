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
  }, []);

  function handleChange(event) {
    let data = [...places]
    if (!places.includes(event.target.value)) {
      data.push(event.target.value)
      setPlaces(data);
      
    } else {
      alert("Already Selected.");
    }
    setObj((prev) => {
      return {
        ...prev,
        [name]: data,
      };
    });
  }

  return (
    <div className="list-container">
      <h3>
        {name === "shippingList"
          ? "Shipping Available In: "
          : "Delivery Available In: "}
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
