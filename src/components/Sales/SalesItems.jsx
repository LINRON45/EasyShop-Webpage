import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import { getCookie } from "react-use-cookie";

function SalesItems(props) {
  const [update, setupdate] = useState(false);

  const [newObj, setObj] = useState({
    itemName: props.Name,
    price: props.Price,
    shippingFee: props.ShippingFee,
    description: props.Description,
  });

  const SaleitemId = props.id;
  const user = getCookie("username");

  function handleChange(event) {
    const { name, value } = event.target;

    setObj((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  async function updatefile() {
    console.log(newObj);
    const fileRef = doc(db, `Users/${user}/Sales`, `${SaleitemId}`);

    await updateDoc(fileRef, {
      ...newObj,
    });
    setupdate(!update);
  }

  async function deletefile() {
    console.log(SaleitemId);
    console.log(user);

    await deleteDoc(doc(db, `Users/${user}/Sales`, `${SaleitemId}`));
  }

  return (
    <div className="Sales-Item">
      <img
        src={
          props.Image ||
          `https://c.tenor.com/SUvStf4vWyQAAAAM/loading-and-you-failed.gif`
        }
        alt={props.Name}
      ></img>
      <ul className="Sales-ul">
        <li className="Sales-li">
          Name:{" "}
          {!update ? (
            `${props.Name}`
          ) : (
            <input
              type="text"
              name="itemName"
              onChange={handleChange}
              value={newObj.itemName}
            ></input>
          )}
        </li>

        <li className="Sales-li">
          Price:{" "}
          {!update ? (
            `${props.Price}`
          ) : (
            <input
              type="number"
              name="price"
              onChange={handleChange}
              value={newObj.price}
            ></input>
          )}
        </li>

        <li className="Sales-li">
          Shipping Fee:{" "}
          {!update ? (
            `${props.ShippingFee}`
          ) : (
            <input
              type="text"
              name="shippingFee"
              onChange={handleChange}
              value={newObj.shippingFee}
            ></input>
          )}
        </li>

        <li className="Sales-li">
          Description:
          <ul>
            {!update ? (
              <li>{props.Description}</li>
            ) : (
              <li>
                <textarea
                  type="text"
                  name="description"
                  row="3"
                  onChange={handleChange}
                  value={newObj.description}
                ></textarea>
              </li>
            )}
          </ul>
        </li>
        <div>
          <button onClick={updatefile}>{update ? "Save" : "Update"}</button>
          <button onClick={deletefile}>Remove</button>
        </div>
      </ul>
    </div>
  );
}

export default SalesItems;
