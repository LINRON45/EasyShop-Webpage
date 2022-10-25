import React, { useState } from "react";
import { getCookie } from "react-use-cookie";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase-config";

function ShoppingCart({ item }) {
  const uid = getCookie("uid");

  const fileRef = doc(db, `Users/${uid}/Cart`, `${item.itemName}`);

  async function increaseQuantity() {
    await updateDoc(fileRef, {
      quantity: item.quantity + 1,
    });
  }

  async function decreaseQuantity() {
    if (item.Quantity !== 1) {
      await updateDoc(fileRef, {
        quantity: item.quantity - 1,
      });
    }
  }

  const [remove, setRemove] = useState(false);
  async function removeItem() {
    try {
      await deleteDoc(doc(db, `Users/${uid}/Cart`, `${item.itemName}`));
      setRemove(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Cart-contents" style={{ display: remove && "none" }}>
      <img
        src={
          item.image ||
          "https://c.tenor.com/SUvStf4vWyQAAAAM/loading-and-you-failed.gif"
        }
        alt=""
      ></img>

      <div className="product">
        <p>{item.itemName}</p>
      </div>

      <div className="quantity">
        <button onClick={increaseQuantity}>
          <img className="arrow" src="arrow.png" alt="" />
        </button>
        <p>{item.quantity}</p>
        <button onClick={decreaseQuantity}>
          <img id="decrease-arrow" className="arrow" src="arrow.png" alt="" />
        </button>
      </div>

      <div>
        {item.shippingFee !== "null" ? (
          <>
            <p>$ {parseFloat(item.shippingFee).toFixed(2)}</p>
            <p>{item.currency}</p>
          </>
        ) : (
          "-"
        )}
      </div>

      <div>
        {item.deliveryFee !== "null" ? (
          <>
            <p>$ {parseFloat(item.deliveryFee).toFixed(2)}</p>
            <p>{item.currency}</p>
          </>
        ) : (
          "-"
        )}
      </div>

      <div>
        {item.currency !== "null" ? (
          <>
            <p>$ {parseFloat(item.total).toFixed(2)}</p>
            <p>{item.currency}</p>
          </>
        ) : (
          <p>$ {parseFloat(item.total).toFixed(2)}</p>
        )}
      </div>

      <div>
        <button className="Cart-remove" onClick={removeItem}>
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/6572/6572664.png"
            alt=""
          /> */}
          remove
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
