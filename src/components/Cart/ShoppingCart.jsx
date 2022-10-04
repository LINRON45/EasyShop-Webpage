import React from "react";
import { getCookie } from "react-use-cookie";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase-config";

function ShoppingCart(props) {
  const uid = getCookie("uid");

  const fileRef = doc(db, `Users/${uid}/Cart`, `${props.Name}`);

  async function increaseQuantity() {
    await updateDoc(fileRef, {
      quantity: props.Quantity + 1,
    });
  }

  async function decreaseQuantity() {
    if (props.Quantity !== 1) {
      await updateDoc(fileRef, {
        quantity: props.Quantity - 1,
      });
    }
  }

  async function removeItem() {
    await deleteDoc(doc(db, `Users/${uid}/Cart`, `${props.id}`));
  }

  return (
    <div className="Cart-contents">
      <img
        src={
          props.Image ||
          "https://c.tenor.com/SUvStf4vWyQAAAAM/loading-and-you-failed.gif"
        }
        alt=""
      ></img>

      <div className="product">
        <p>{props.Name}</p>
      </div>

      <div className="quantity">
        <button onClick={increaseQuantity}>
          <img className="arrow" src="arrow.png" alt="" />
        </button>
        <p>{props.Quantity}</p>
        <button onClick={decreaseQuantity}>
          <img id="decrease-arrow" className="arrow" src="arrow.png" alt="" />
        </button>
      </div>

      <div>
        <p>$ {(props.Price * props.Quantity).toFixed(2)}</p>
        <p>{props.Currency}</p>
      </div>

      <div>
        <p>$ {(props.Price * props.Quantity).toFixed(2)}</p>
        <p>{props.Currency}</p>
      </div>

      <div>
        <p>$ {(props.Price * props.Quantity).toFixed(2)}</p>
        <p>{props.Currency}</p>
      </div>

      <div>
        <button className="Cart-remove" onClick={removeItem}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
