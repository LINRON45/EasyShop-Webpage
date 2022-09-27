import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { getCookie } from "react-use-cookie";
import SalesItems from "../components/Sales/SalesItems";

function Sales() {
  const userId = getCookie("uid");

  const userItems = [];

  const [test, settest] = useState([]);

  async function getSales() {
    const docref = await getDocs(collection(db, `Users/${userId}/Sales`));

    docref.forEach(async (doc) => {
      userItems.push(doc.data());
    });
    settest(userItems);
  }

  useEffect( () =>  getSales());

  return (
    <div className="Sales">
      {test.map((items, index) => (
        <SalesItems
          key={index}
          id={items.id}
          Name={items.itemName}
          Image={items.image}
          Price={items.price}
          ShippingFee={items.shippingFee}
          Description={items.description}
        />
      ))}
    </div>
  );
}

export default Sales;
