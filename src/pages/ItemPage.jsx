import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import Login from "./Login";
import { getCookie } from "react-use-cookie";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";

function ItemPage() {
  const location = useLocation();

  const [data, setData] = useState(null);
  const [shipList, setShipList] = useState(null);
  const [deliverList, setDeliverList] = useState(null);

  const [ship, setShip] = useState(false);
  const [deliver, setDeliver] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [stay, setStay] = useState(false);
  const [button, setButton] = useState(false);

  useLayoutEffect(() => {
    const checkCart = async () => {
      const uid = getCookie("uid");

      const existInCart = await getDoc(
        doc(db, `Users/${uid}/Cart`, location.state.itemName)
      );

      if (existInCart.exists()) {
        console.log("button disabled");
        setButton(true);
      }
    };

    checkCart();
  }, []);

  useEffect(() => {
    setShipList(location.state.shippingList);
    setDeliverList(location.state.deliveryList);
    setData(location.state);
  }, [location.state]);

  function total() {
    let price;
    if (data.price) {
      price = data.price;
    } else {
      price = 0;
    }

    if (!ship && deliver) {
      return (parseFloat(price) + parseFloat(data.deliveryFee)).toFixed(2);
    }

    if (ship && !deliver) {
      return (parseFloat(price) + parseFloat(data.shippingFee)).toFixed(2);
    }

    if (ship) {
      if (deliver) {
        return (
          parseFloat(price) +
          parseFloat(data.shippingFee) +
          parseFloat(data.deliveryFee)
        ).toFixed(2);
      }
      return (parseFloat(price) + parseFloat(data.shippingFee)).toFixed(2);
    } else if (deliver) {
    }

    return parseFloat(price).toFixed(2);
  }

  function changeTotal(event) {
    const { name, checked } = event.target;

    if (name === "ship") {
      setShip(checked);
    } else {
      setDeliver(checked);
    }
  }

  async function AddtoCart() {
    const login = getCookie("loggedIn");
    const uid = getCookie("uid");
    if (login !== "true") {
      setStay(true);
      setShowLogin(true);
      return;
    }

    try {
      await setDoc(doc(db, `Users/${uid}/Cart/${data.itemName}`), {
        itemName: data.itemName,
        image: data.image,
        price: data.price ? data.price : "null",
        currency: data.currency ? data.currency : "null",
        shippingFee: data.shippingFee && ship ? data.shippingFee : "null",
        deliveryFee: data.deliveryFee && deliver ? data.deliveryFee : "null",
        // deliveryLocation: deliveryLocation,
        // shippingLocation: shippingLocation,
        quantity: 1,
        total: total(),
      });

      setButton(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="itemContainer">
      {data && (
        <div>
          <div id="item-img">
            <img src={data.image} alt={data.itemName} />
          </div>

          <div id="info">
            <section id="itemInfo">
              <p>{data.itemName}</p>
              <hr></hr>
              <p>Manufactured In {data.country}</p>
              <p>
                <span>Condition: </span>
                {data.condition}
              </p>

              <p>
                <span>Price:</span> ${data.price ? data.price : "0.00"}{" "}
                {data.currency}
              </p>
              {data.shippingFee && (
                <p>
                  <span> Shipping Cost:</span> ${data.shippingFee}{" "}
                  {data.currency}
                </p>
              )}
              {data.deliveryFee && (
                <p>
                  <span>Delivery Cost:</span> ${data.deliveryFee}{" "}
                  {data.currency}
                </p>
              )}

              <section id="details">
                <h1 className="item-header">Description</h1>
                {data.description}
              </section>
            </section>
          </div>

          <section id="toCart">
            <p>
              $ {total()} <span>{data.currency}</span>
            </p>
            <div style={{ minHeight: "2vw" }}>
              {shipList && (
                <section>
                  <label htmlFor="ship-box">Ship</label>
                  <input type="checkbox" name="ship" onChange={changeTotal} />
                </section>
              )}
              {deliverList && (
                <section>
                  <label htmlFor="delivery-box">Deliver</label>
                  <input
                    type="checkbox"
                    id="delivery-box"
                    name="deliver"
                    onChange={changeTotal}
                  />
                </section>
              )}
            </div>
            <button onClick={AddtoCart} disabled={button}>
              Add to Cart
            </button>
            {showLogin && (
              <div id="cartLogin">
                <Login showLogin={setShowLogin} cart={stay} />
              </div>
            )}
          </section>

          <div id="contact">
            <h1 className="item-header">Contact Retailer</h1>
            <p>
              <span>E-mail Address: </span> {data.email}
            </p>
            <p>
              <span>Phone Number: </span> {data.phone}
            </p>
          </div>

          {shipList && deliverList && (
            <table>
              <thead>
                <tr>
                  {shipList && <th>Shipping Countries</th>}
                  {deliverList && <th>Delivery Countries</th>}
                </tr>
              </thead>

              <tbody>
                {shipList && (
                  <tr>
                    {shipList.map((place, index) => {
                      return <td key={index}>{place}</td>;
                    })}
                  </tr>
                )}

                {deliverList && (
                  <tr>
                    {deliverList.map((place, index) => {
                      return <td key={index}>{place}</td>;
                    })}
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemPage;
