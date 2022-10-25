import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { getCookie } from "react-use-cookie";
import ShoppingCart from "../components/Cart/ShoppingCart";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase-config";
import Zoom from "@mui/material/Zoom";

function UserCart() {
  const [files, setfiles] = useState([]);
  const uid = getCookie("uid");

  async function getFiles() {
    const cartData = [];
    const allCart = await getDocs(collection(db, `Users/${uid}/Cart`));

    allCart.forEach((item) => {
      cartData.push(item.data());
      setfiles(cartData);
    });
  }

  useLayoutEffect(() => {
    getFiles();
  }, []);

  return (
    <Zoom in={true}>
      <div className="Cart">
        <div className="Cart-headings">
          <h3>Product Image</h3>
          <h3>Name</h3>
          <h3>Quantity</h3>
          <h3>Shipping Fee</h3>
          <h3>Delivery Fee</h3>
          <h3>Total Cost</h3>
        </div>
        {files &&
          files.map((items, index) => {
            return <ShoppingCart key={index} item={items} />;
          })}

        {/* <div id="checkout">
        <p>$$$</p>
        <p>$$$</p>
        <p>$$$</p>
        <div>
          <p>$$$</p>
          <button>Checkout</button>
        </div>
      </div> */}
      </div>
    </Zoom>
  );
}

export default UserCart;
