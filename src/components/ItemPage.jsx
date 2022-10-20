import { DateRange } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function ItemPage() {
  const location = useLocation();

  const [data, setData] = useState(null);
  const [shipList, setShipList] = useState(null);
  const [deliverList, setDeliverList] = useState(null);

  useEffect(() => {
    setShipList(location.state.shippingList);
    setDeliverList(location.state.deliveryList);
    setData(location.state);
  }, [location.state]);

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
              <p>Manufactured In {data.country}</p>
              <p>
                $ {data.price} {data.currency}
              </p>
              {data.shippingFee && (
                <p>
                  {data.shippingFee} {data.currency} Shipping
                </p>
              )}
              {data.deliveryFee && (
                <p>
                  {data.deliveryFee} {data.currency} Delivery
                </p>
              )}
            </section>
            <button>Add to Cart</button>
            <button>Purchase</button>
          </div>

          <section>
            <h1>Description</h1>
            {data.description}
          </section>

          {shipList && (
            <section>
              <h1>Shipping Countries</h1>

              <ul>
                {shipList.map((place, index) => {
                  return <li key={index}>{place}</li>;
                })}
              </ul>
            </section>
          )}

          {deliverList && (
            <section>
              <h1>Delivery Countries</h1>

              <ul>
                {deliverList.map((place, index) => {
                  return <li key={index}>{place}</li>;
                })}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemPage;
