import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import { getCookie } from "react-use-cookie";

function SalesItems({ obj }) {
  const [update, setupdate] = useState(false);

  function handleChange() {}
  // async function updatefile() {
  //   console.log(newObj);
  //   const fileRef = doc(db, `Users/${uid}/Sales`, `${SaleitemId}`);

  //   await updateDoc(fileRef, {
  //     ...newObj,
  //   });
  //   setupdate(!update);
  // }

  async function deletefile() {
    // await deleteDoc(doc(db, `Users/${uid}/Sales`, `${SaleitemId}`));
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
        <li className="Sales-li">Name: {obj.itemName} <button onClick={deletefile}>Edit</button></li>

        <li className="Sales-li">Manufactured In: {obj.country} <button onClick={deletefile}>Edit</button></li>

        <li className="Sales-li">Phone Number: {obj.phone} <button onClick={deletefile}>Edit</button></li>

        <li className="Sales-li">Email: {obj.email} <button onClick={deletefile}>Edit</button></li>

        <li className="Sales-li">Price: {obj.price} <button onClick={deletefile}>Edit</button></li>

        <li className="Sales-li">Shipping Fee: {obj.shippingFee} <button onClick={deletefile}>Edit</button></li>

        <li className="Sales-li">Delivery Fee: {obj.deliveryFee} <button onClick={deletefile}>Edit</button></li>

        {/* add lists of shipping and delivery location */}

        <li className="Sales-li">Description: {obj.description} <button onClick={deletefile}>Edit</button></li>
        <div>
          <button onClick={deletefile}>Remove</button>
          
        </div>
      </ul>
    </div>
  );
}

export default SalesItems;
