import React, { useState } from "react";
import { getCookie } from "react-use-cookie";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase-config";

function Item_box(props) {
  const user = getCookie("username");

  async function toCart() {
    await setDoc(doc(db, `Users/${user}/Cart/${props.id}`), {
      ...props.Obj,
      quantity: 1,
    });
  }

  return (
    <div className="items">
      <img
        className="items-img"
        src={
          props.image ||
          `https://c.tenor.com/SUvStf4vWyQAAAAM/loading-and-you-failed.gif`
        }
        alt={props.Name}
      />
      <p>Product: {props.Name}</p>
      <p>Price: $ {props.Price}</p>
      <p>
        {props.Shipping === "0"
          ? "Free Shipping"
          : `Shipping Price: $ ${props.Shipping}`}
      </p>
      <div>
        <button className={props.id} onClick={toCart}>
          Add to Cart
        </button>
        <button
          className={props.id}
          onClick={(event) => console.log(event.target.className)}
        >
          See more details
        </button>
      </div>
    </div>
  );
}

export default Item_box;
