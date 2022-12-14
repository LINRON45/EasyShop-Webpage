import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import { getCookie } from "react-use-cookie";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../services/firebase-config";

function SalesItems({ obj, callback }) {

  const [deleteImg, setImg] = useState("closeBin.png");
  const uid = getCookie("uid");

  function editInput() {
    alert("Feature Coming Soon!");
  }

  async function deletefile() {
    try {
      await deleteDoc(doc(db, `Users/${uid}/Sales`, `${obj.itemName}`));
      callback();
    } catch (error) {
      console.log(error);
    }

    try {
      const imgRef = ref(storage, `${uid}/${obj.itemName}`);

      await deleteObject(imgRef);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Sales-Item">
      <img
        src={
          obj.image ||
          `https://c.tenor.com/SUvStf4vWyQAAAAM/loading-and-you-failed.gif`
        }
        alt={obj.itemName}
      ></img>
      <ul className="Sales-ul">
        <li className="Sales-li">
          <span>Name: </span>
          {obj.itemName}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>

        <li className="Sales-li">
          <span>Manufactured In: </span> {obj.country}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>

        <li className="Sales-li">
          <span>Phone Number: </span>
          {obj.phone}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>

        <li className="Sales-li">
          <span>Email: </span>
          {obj.email}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>

        <li className="Sales-li">
          <span>Price: </span>$ {obj.price}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>

        <li className="Sales-li">
          <span>Shipping Fee: </span>$ {obj.shippingFee}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>

        <li className="Sales-li">
          <span>Delivery Fee: </span>$ {obj.deliveryFee}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>

        {obj.shippingList && (
          <li className="Sales-li">
            <span>Shipping Locations: </span>
            <ul>
              {obj["shippingList"].map((location, index) => {
                return <li key={index}>{location}</li>;
              })}
            </ul>
            <button onClick={editInput}>
              <img src="edit.png" alt="" />
            </button>
          </li>
        )}

        {obj.deliveryList && (
          <li className="Sales-li">
            <span>Delivery Locations: </span>{" "}
            <ul>
              {obj["deliveryList"].map((location, index) => {
                return <li key={index}>{location}</li>;
              })}
            </ul>
            <button onClick={editInput}>
              <img src="edit.png" alt="" />
            </button>
          </li>
        )}

        {/* add lists of shipping and delivery location */}

        <li className="Sales-li">
          <span>Description: </span>
          {obj.description}{" "}
          <button onClick={editInput}>
            <img src="edit.png" alt="" />
          </button>
        </li>
        <div className="Rm-div">
          <button
            className="Sales-rm"
            onMouseOver={() => setImg("openBin.png")}
            onMouseLeave={() => setImg("closeBin.png")}
            onClick={deletefile}
          >
            <img src={deleteImg} alt="" />
          </button>
        </div>
      </ul>
    </div>
  );
}

export default SalesItems;
