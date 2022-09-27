import React from "react";
import { getCookie } from "react-use-cookie";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase-config";

function Item_box(props) {
  const details = props.Description;
  const shipping = props.Shipping;
  const delivery = props.Delivery;
  const uid = getCookie("uid");

  async function toCart() {
    await setDoc(doc(db, `Users/${uid}/Cart/${props.Name}`), {
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
      <div>
        <a>{props.Name}</a>
        <p>$ 222{props.Price} {props.Currency}</p>
        <p>new {props.Condition}</p>
        <p>$ 222{props.Price} {props.Currency} Shipping</p>

        <p>Manufactured in (Country)</p>
      </div>

    </div>
  );
}

export default Item_box;
