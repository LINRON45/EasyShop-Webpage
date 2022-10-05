import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { getCookie } from "react-use-cookie";
import SalesItems from "../components/Sales/SalesItems";
import Zoom from "@mui/material/Zoom";


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
    <Zoom in={true}>

    <div className="Sales">
      {test.map((items, index) => (
        <SalesItems
          key={index}
          obj={items}
        />
      ))}
    </div>
    </Zoom>
  );
}

export default Sales;
