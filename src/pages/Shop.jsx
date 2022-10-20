import React, { useEffect, useState } from "react";
import ItemBox from "../components/Shop/Item-box";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";
import Zoom from "@mui/material/Zoom";
import { isEmpty } from "@firebase/util";

function Shop() {
  const [itemsArr, setItemsArr] = useState([]);
  const [pageText, setText] = useState("Loading...");

  useEffect(() => {
    async function getData() {
      const users = await getDocs(collection(db, "Users"));


      users.forEach(async (user) => {
        const items = await getDocs(collection(db, `Users/${user.id}/Sales`));
        if (items.empty) {
          setText("No Products On Sale!");
        }

        items.forEach((item) => {
          setItemsArr((prev) => [...prev, item.data()]);
        });
      });
    }

    getData();
  }, []);

  function createItembox(item, index) {
    return <ItemBox key={index} itemData={item} />;
  }

  return (
    <Zoom in={true}>
      <div className="Shop">
        <div className="list-items">
          {itemsArr instanceof Array && itemsArr.length ? (
            itemsArr.map((item, index) => createItembox(item, index))
          ) : (
            <p>{pageText}</p>
          )}
        </div>
      </div>
    </Zoom>
  );
}

export default Shop;
