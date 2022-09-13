import React from "react";
import { getCookie } from "react-use-cookie";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase-config";

function ShoppingCart(props) {
  const user = getCookie("username");

  const fileRef = doc(db, `Users/${user}/Cart`, `${props.id}`);

  async function increaseQuantity() {
    await updateDoc(fileRef, {
      quantity: props.quantity + 1,
    });
  }

  async function decreaseQuantity() {
    if (props.quantity !== 1) {
      await updateDoc(fileRef, {
        quantity: props.quantity - 1,
      });
    }
  }

  async function removeItem() {
    await deleteDoc(doc(db, `Users/${user}/Cart`, `${props.id}`));
  }

  return (
    <div className="Cart-contents">
      <div>
        <img
          src={
            props.Image ||
            "https://c.tenor.com/SUvStf4vWyQAAAAM/loading-and-you-failed.gif"
          }
          alt=""
        ></img>
      </div>

      <div className="product">
        <p>{props.Name}</p>
        <button>See more details</button>
      </div>

      <div className="quantity">
        <button onClick={decreaseQuantity}>-</button>
        <p>{props.quantity}</p>
        <button onClick={increaseQuantity}>+</button>
      </div>

      <div>
        <p>$ {props.Price*props.quantity}</p>
        <p>{props.Currency}</p>
      </div>

      <button className="Cart-remove" onClick={removeItem}>
        {" "}
        Remove from Cart
      </button>
    </div>
  );
}

export default ShoppingCart;
