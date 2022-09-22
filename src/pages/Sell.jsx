import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, query, doc, setDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../services/firebase-config";
import { Fab } from "@mui/material";
import { getCookie } from "react-use-cookie";
import axios from "axios";

function Sell() {
  const uid = getCookie("uid");

  const [image, setImage] = useState("");
  const [button, setButton] = useState("Submit");
  const [buttonState, setState] = useState(false);

  const [sellItem, setsellItem] = useState({
    itemName: "",
    image: "",
    condition: "",
    country: "",
    currency: "USD",
    // shippingFee: null,
    // deliveryFee: null,
    // shippingList: [],
    // description: "",
  });
  const storageRef = ref(storage, `${uid}/${sellItem.itemName}`);

  let dict = {};
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [preview, setPreview] = useState(
    "https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png"
  );

  useEffect(async () => {
    const countryRes = await axios.get("https://restcountries.com/v2/all");

    const data = countryRes.data;

    data.forEach((country) => {
      setCountries((prev) => [...prev, country.name]);
    });

    const currencyRes = await axios.get(
      "https://restcountries.com/v3.1/currency/dollar"
    );

    const currencyData = currencyRes.data;

    currencyData.forEach((currency) => {
      const newData = currency.currencies;

      for (const [key, value] of Object.entries(newData)) {
        if (dict[key]) {
          continue;
        }

        dict[key] = value.name;
        setCurrencies((prev) => [...prev, key]);
      }
    });
  }, []);

  function imageUpload(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function saveItemValues(event) {
    const { name, value } = event.target;

    setsellItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    console.log(sellItem);
  }

  function uploadImg() {
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setState(true);
        setButton(`Uploading...${prog}%`);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => console.error(error),

      async () => {
        const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(imageURL);

        // const imageURL = await getDownloadURL(
        //   ref(storage, `${uid}/${sellItem.itemName}`)
        // );

        setsellItem((prevVal) => {
          return { ...prevVal, image: imageURL };
        });

        setState("");
        setDoc(doc(db, `Users/${uid}/Sales/${sellItem.itemName}`), {
          ...sellItem,
          date: Date().toString(),
          image: imageURL,
        });

        setButton("Submit");
      }
    );
  }

  return (
    <div className="Sell" id="sell">
      <form className="sell-form" onSubmit={(e) => e.preventDefault()}>
        <section id="img-sec">
          <button onClick={() => document.getElementById("inp-img").click()}>
            Upload Image
          </button>
          <input
            type="file"
            id="inp-img"
            accept="image/png, image/jpeg"
            onChange={imageUpload}
            hidden
          />

          <img id="preview" src={preview} alt={sellItem.itemName} />
        </section>

        <input
          onChange={saveItemValues}
          type="text"
          name="itemName"
          placeholder="Enter the name of the item..."
          value={sellItem.itemName}
        />

        <select id="country" name="country" onChange={saveItemValues}>
          <option disabled selected>
            {" "}
            Select Country of Manufacture
          </option>
          {countries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>

        <ul id="transport-opt">
          <li>
            <p>Is Shipping Available?</p>
            <input type="radio" id="ship-y" name="ship" value="Yes" />
            <label htmlFor="ship-y">Yes</label>

            <input type="radio" id="ship-n" name="ship" value="No" />
            <label htmlFor="ship-n">No</label>
          </li>

          <li>
            <p>Is Delivery Available?</p>
            <input type="radio" id="delivery-y" name="delivery" value="Yes" />
            <label htmlFor="delivery-y">Yes</label>
            <input type="radio" id="delivery-n" name="delivery" value="No" />
            <label htmlFor="delivery-n">No</label>
          </li>
        </ul>

        <section id="pricing">
          <input
            id="sell-price"
            onChange={saveItemValues}
            type="number"
            name="price"
            min="0.00"
            max="100000.00"
            step="0.01"
            placeholder="Enter the selling price..."
          />

          <input
            id="shipping-fee"
            onChange={saveItemValues}
            type="number"
            name="shippingFee"
            min="0.00"
            max="100000.00"
            step="0.01"
            placeholder="Enter Shipping Fee..."
          />

          <input
            id="delivery-fee"
            onChange={saveItemValues}
            type="number"
            name="deliveryFee"
            min="0.00"
            max="100000.00"
            step="0.01"
            placeholder="Enter Delivery Fee..."
          />

          <select id="currency" onChange={saveItemValues}>
            {currencies.map((currency, index) => {
              return (
                <option key={index} value={currency}>
                  {currency}
                </option>
              );
            })}
          </select>
        </section>

        <section>
          <h1>Shipping location</h1>
          <button>Add a Location</button>
        </section>

        <div>
          <textarea
            onChange={saveItemValues}
            rows="6"
            name="description"
            placeholder="Description..."
          />
        </div>

        <Fab
          id="fab2"
          className="fab-but"
          variant="extended"
          onClick={() => {
            uploadImg();
          }}
          disabled={buttonState}
        >
          {button}
        </Fab>
      </form>
    </div>
  );
}

export default Sell;
