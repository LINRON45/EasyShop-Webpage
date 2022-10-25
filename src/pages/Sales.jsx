import React, { useState, useEffect, useCallback } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { getCookie } from "react-use-cookie";
import SalesItems from "../components/Sales/SalesItems";
import Zoom from "@mui/material/Zoom";

function Sales() {
  const userId = getCookie("uid");

  const [test, settest] = useState([]);
  const getData = async () => {
    let data = [];
    const docref = await getDocs(collection(db, `Users/${userId}/Sales`));

    docref.forEach((doc) => {
      data.push(doc.data());
    });
    console.log("test");
    settest(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteCallback = useCallback(() => {
    getData()
  }, [test]);

  return (
    <Zoom in={true}>
      <div className="Sales">
        {test !== [] ? (
          test.map((items, index) => (
            <SalesItems key={index} obj={items} callback={deleteCallback} />
          ))
        ) : (
          <p>You Have No Sales Items</p>
        )}
      </div>
    </Zoom>
  );
}

export default Sales;
