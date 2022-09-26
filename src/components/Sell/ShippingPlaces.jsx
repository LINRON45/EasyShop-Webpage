import React from "react";

function ShippingPlaces(props) {
  //countries,

  const places = [];

  function addPlace() {
    const container = document.getElementById("shippingPlace");
    container.innerHTML += test2();
  }

  function test2() {
    return `<div>
    <select id="country" name="country">
    <button>close</button>
        <option disabled selected>
        Select Country Available for Shipping
        </option>
        ${props.countries.map((country, index) => {
          return (
            `<option key=${index} value=${country}>
              ${country}
            </option>`
          );
        })}
      </select>
      <button>close</button>
      </div>`;
  }

  return (
    <div>
      <h1>Shipping location </h1>
      <div id="shippingPlace">
        <div>
        <select id="country" name="country">
          <option disabled selected>
            Select Country Available for Shipping
          </option>
          {props.countries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        </div>
        <button>close</button>
      </div>

      <button onClick={addPlace}>Add a Location</button>
    </div>
  );
}

export default ShippingPlaces;
