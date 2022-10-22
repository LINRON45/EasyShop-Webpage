import React, { useEffect, useState } from "react";
import ItemBox from "../components/Shop/Item-box";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";
import Zoom from "@mui/material/Zoom";
import LoadingOverlay from "react-loading-overlay-ts";
import { GridLoader } from "react-spinners";

function Shop() {
  const [itemsArr, setItemsArr] = useState([]);
  const [pageText, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const users = await getDocs(collection(db, "Users"));

      users.forEach(async (user) => {
        const items = await getDocs(collection(db, `Users/${user.id}/Sales`));
        if (items.empty) {
          setLoading(false);

          setText("No Products On Sale!");
        }

        items.forEach((item) => {
          setItemsArr((prev) => [...prev, item.data()]);
        });
      });

      return setLoading(false);
    }

    getData();
  }, []);

  function createItembox(item, index) {
    return <ItemBox key={index} itemData={item} />;
  }

  return (
    <LoadingOverlay
      id="loading-Overlay"
      active={loading}
      spinner={<GridLoader color="#ff5c33" />}
    >
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
    </LoadingOverlay>
  );
}

export default Shop;
