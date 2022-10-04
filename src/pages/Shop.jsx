import React, { useEffect, useState } from "react";
import ItemBox from "../components/Shop/Item-box";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";

function Shop() {
  const [itemsArr, setItemsArr] = useState([]);

  useEffect(async () => {
    const users = await getDocs(collection(db, "Users"));

    users.forEach(async (user) => {
      const items = await getDocs(collection(db, `Users/${user.id}/Sales`));

      items.forEach((item) => {
        setItemsArr((prev) => [...prev, item.data()]);
      });
    });
  }, []);

  function createItembox(item, index) {
    return <ItemBox key={index} Obj={item} />;
  }

  return (
    <div className="Shop">
      <div className="list-items">
        {itemsArr instanceof Array && itemsArr.length
          ? itemsArr.map((item, index) => createItembox(item, index))
          : "Loading..."}
      </div>
    </div>
  );
}

export default Shop;
