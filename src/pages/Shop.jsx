import React, { useEffect, useState } from "react";
import ItemBox from "../components/Shop/Item-box";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";

function Shop() {
  const [itemsArr, setItemsArr] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      const data = [];
      const users = await getDocs(collection(db, "Users"));

      const loadItems = async () => {
        users.forEach(async (user) => {
          const items = await getDocs(collection(db, `Users/${user.id}/Sales`));
          
          items.forEach((item) => {
            data.push(item.data());
          });
          setItemsArr((existing) => [...existing, ...data]);
        });
        return data;
      };
      const result = await loadItems();
      // console.log("Result", result);
      return result;
    };
    loadData();
  }, []);



  function createItembox(item, index) {
    return (
      <ItemBox
        key={index}
        id={item.id} //substitute for now
        Name={item.itemName}
        Price={item.price}
        image={item.image}
        Shipping={item.shippingFee}
        Obj={item}
      />
    );
  }

  //show loading only when fetching data

  return (
    <div className="Shop">
      <div className="list-items">
        {itemsArr instanceof Array && itemsArr.length
          ? itemsArr.map(createItembox)
          : "Loading..."}
      </div>
    </div>
  );
}

export default Shop;
