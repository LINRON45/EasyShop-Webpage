import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, query, doc, setDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../services/firebase-config";
import { Fab } from "@mui/material";
import { getCookie } from "react-use-cookie";
import axios from "axios";

function Sell() {
  const [image, setImage] = useState(null);
  const [button, setButton] = useState("Upload");

  const [sellItem, setsellItem] = useState({
    itemName: "",
    image: "",
    number: "",
    country: "",
    date: "",
    currency: "",
    price: "",
    shippingFee: "",
    description: "",
  });

  let dict = {};
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [preview, setPreview] = useState(
    "https://assets.humix.com/nopreview.png"
  );

  useEffect(async () => {
    const countryRes = await axios.get("https://restcountries.com/v2/all");

    const data = countryRes.data;

    data.forEach((country) => {
      // console.log(country.name)
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

    console.log(dict);
    console.log(countries);
  }, []);

  function ImgChangeValue(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function ChangeValue(event) {
    const { name, value } = event.target;

    setsellItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
        id: new Date().getTime(),
      };
    });
  }

  const q = query(collection(db, "Users"));
  const currentUser = getCookie("uid");

  const storageRef = ref(storage, `${currentUser}/${sellItem.id}`);

  async function CreateItem() {
    const querySnapshot = await getDocs(q);

    // Upload Image to Firebase Storage
    querySnapshot.forEach(async () => {
      const imageData = await getDownloadURL(storageRef);

      console.log(imageData);
      setsellItem((prevValue) => {
        return {
          ...prevValue,
          image: imageData,
        };
      });
    });

    setButton("Upload");
  }

  // useEffect(()=>{
  //    setDoc(doc(db, `Users/${currentUser}/Sales/${sellItem.id}`), {
  //     ...sellItem,
  //   });
  // }, [])

  const [buttonState, setState] = useState(null);

  function uploadImg(event) {
    event.preventDefault();
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setButton(`Uploading...${prog}%`);
        setState("true");
      },
      (error) => console.log(error),
      () => {
        window.alert(`finish uploading`);
        setButton("Submit");
        setState("");
      }
    );
  }

  function Submitfunc(event) {
    event.preventDefault();

    CreateItem();
  }

  return (
    <div className="Sell" id="sell">
      <form className="sell-form">
        <section id="img-sec">
          <button
            onClick={(event) => {
              document.getElementById("inp-img").click();
              event.preventDefault();
            }}
          >
            click here
          </button>
          <input
            type="file"
            id="inp-img"
            accept="image/png, image/jpeg"
            onChange={ImgChangeValue}
            hidden
          />

          <img id="preview" src={preview} alt={sellItem.itemName} />
        </section>

        <input
          onChange={ChangeValue}
          type="text"
          name="itemName"
          placeholder="Enter the name of the item..."
          value={sellItem.itemName}
        />

        <select id="country">
          <option>select a country</option>
          {countries.map((country) => {
            return <option value={country}>{country}</option>;
          })}
        </select>

        <section>
          <input
            id="sell-price"
            onChange={ChangeValue}
            type="number"
            name="price"
            min="0.00"
            max="100000.00"
            step="0.01"
            placeholder="Enter the selling price..."
            value={sellItem.price}
          />

          <input
            id="shipping-fee"
            onChange={ChangeValue}
            type="number"
            name="shippingFee"
            min="0.00"
            max="100000.00"
            step="0.01"
            placeholder="Enter Shipping Fee..."
          />

          <select id="currency">
            {currencies.map((currency) => {
              return <option value={currency}>{currency}</option>;
            })}
          </select>
        </section>

        <section>
          <p>Shipping Available?</p>
          <input type="radio" id="ship-y" value="Yes" />
          <label for="ship-y">Yes</label>

          <input type="radio" id="ship-n" value="No" />
          <label for="ship-n">No</label>
        </section>

        <section>
          <h1>Shipping location</h1>
          <button>Add a Location</button>
        </section>

        <div>
          <textarea
            onChange={ChangeValue}
            rows="6"
            name="description"
            placeholder="Description..."
          />
        </div>

        <Fab
          id="fab2"
          className="fab-but"
          variant="extended"
          onClick={button === "Submit" ? Submitfunc : uploadImg}
          disabled={buttonState}
        >
          {button}
        </Fab>
      </form>
    </div>
  );
}

export default Sell;
