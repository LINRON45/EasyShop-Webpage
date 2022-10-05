import React from "react";
import { getCookie } from "react-use-cookie";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import { Link } from "react-router-dom";

function Item_box(props) {
  const itemData = props.Obj;
  const uid = getCookie("uid");

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
        <Link to="">
          <h3>{itemData.itemName}</h3>
        </Link>
        {itemData.price ? <p className="cost">
          ${Math.floor(itemData.price)}
          <span className="cents">{(itemData.price).split(".")}</span>
          {itemData.currency}
        </p> : <p className="cost">Free</p>}
        {itemData.shippingFee ? (
          <p className="fee">
            ${Math.floor(itemData.shippingFee)}
          <span className="cents">{toString(itemData.shippingFee).split(".")}</span>
          {itemData.currency} Shipping
          </p>
        ) : (
          <p className="fee">Free Shipping</p>
        )}
        {itemData.deliveryFee ? (
          <p className="fee">${Math.floor(itemData.deliveryFee)}
          <span className="cents">{toString(itemData.deliveryFee).split(".")}</span>
          {itemData.currency}</p>
        ) : (
          <p className="fee">No Delivery</p>
        )}
      </div>
      <p className="condition">{itemData.condition}</p>

      <span>Manufactured in {itemData.country}</span>
    </div>
  );
}

export default Item_box;
