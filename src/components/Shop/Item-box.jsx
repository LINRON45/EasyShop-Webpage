import React from "react";
import { getCookie } from "react-use-cookie";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import { Link } from "react-router-dom";

function Item_box({ itemData }) {
  const uid = getCookie("uid");

  const priceCents = parseFloat(
    itemData.price - Math.floor(itemData.price)
  ).toFixed(2);

  const shippingFeeCents = parseFloat(
    itemData.shippingFee - Math.floor(itemData.shippingFee)
  ).toFixed(2);

  const deliveryFeeCents = parseFloat(
    itemData.deliveryFee - Math.floor(itemData.deliveryFee)
  ).toFixed(2);

  async function toCart() {
    await setDoc(doc(db, `Users/${uid}/Cart/${itemData.itemName}`), {
      ...itemData,
      quantity: 1,
    });
  }

  return (
    <div className="items">
      <img
        className="items-img"
        src={
          itemData.image ||
          `https://c.tenor.com/SUvStf4vWyQAAAAM/loading-and-you-failed.gif`
        }
        alt={itemData.itemName}
      />
      <div>
        <Link to="/item" state={itemData}>
          <h3>{itemData.itemName}</h3>
        </Link>
        {itemData.price > 0 ? (
          <p className="cost">
            ${Math.floor(itemData.price)}
            <span className="cents">{priceCents.split("0.")}</span>
          </p>
        ) : (
          <p className="cost">Free</p>
        )}
        {itemData.shippingFee && itemData.shippingList && (
          <>
            {itemData.shippingFee > 0 ? (
              <p className="fee">
                ${Math.floor(itemData.shippingFee)}
                <span className="fee-Cents">
                  {shippingFeeCents.split("0.")}{" "}
                </span>
                Shipping
              </p>
            ) : (
              <p className="fee">Free Shipping</p>
            )}
          </>
        )}

        {!itemData.shippingFee && <p className="fee">No Shipping Available</p>}

        {itemData.deliveryFee && itemData.deliveryList &&
          <>{itemData.deliveryFee > 0 ? <p className="fee">
            ${Math.floor(itemData.deliveryFee)}
            <span className="fee-Cents">{deliveryFeeCents.split("0.")}</span>
            Delivery
          </p>:
          <p className="fee">Free Delivery</p>}</>
        }
        {!itemData.deliveryFee && <p className="fee">No Delivery Available</p>}
      </div>
      <p className="ccy">{itemData.currency}</p>
      <hr></hr>

      <p className="condition">{itemData.condition}</p>

      <span>Manufactured in {itemData.country}</span>
    </div>
  );
}

export default Item_box;
