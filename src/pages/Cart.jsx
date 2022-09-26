import React, { useState, useEffect } from "react";
import { getCookie } from "react-use-cookie";
import ShoppingCart from "../components/Cart/ShoppingCart";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";

function UserCart() {
  const [files, setfiles] = useState([]);
  const uid = getCookie("uid");

  async function getFiles() {
    const arr = [];
    const allCart = await getDocs(collection(db, `Users/${uid}/Cart`));

    allCart.forEach((i) => {
      arr.push(i.data());
    });

    return arr;
  }

  useEffect(async() => {
    const obj = await getFiles();
    setfiles(obj);
  },[]);

  console.log(files);

  return (
    <div className="Cart">
      <h1 className="heading"> Cart</h1>
      <div className="Cart-headings">
        <p>Product Image</p>
        <p>Description</p>
        <p>Quantity</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      {files.map((items, index) => {
        return (
          <ShoppingCart
            key={index}
            id={items.id}
            Image={items.image}
            Name={items.itemName}
            quantity={items.quantity}
            Price={items.price}
            Currency={items.currency}
          />
        );
      })}
    </div>
  );
}

export default UserCart;
