import React, { useLayoutEffect, useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../services/firebase-config";
import { Fab } from "@mui/material";
import { getCookie } from "react-use-cookie";
import axios from "axios";
import ShippingPlaces from "../components/Sell/ShippingPlaces";
import Zoom from "@mui/material/Zoom";
import swal from "sweetalert";

function Sell() {
  const uid = getCookie("uid");

  const inputRef = useRef(null);

  const [image, setImage] = useState("");
  const [button, setButton] = useState("Submit");
  const [buttonState, setState] = useState(false);
  const [showFees, setShowFees] = useState({
    shipping: false,
    delivering: false,
  });

  const [sellItem, setsellItem] = useState({
    itemName: "",
    email: "",
    phone: "",
    condition: "",
    country: "",
    description: "",
  });

  const [prevEmail, setPrevEmail] = useState({
    value: "",
    valid: null,
  });
  const [prevNum, setPrevNum] = useState({
    value: "",
    valid: null,
  });

  const storageRef = ref(storage, `${uid}/${sellItem.itemName}`);

  let countryDict = {};
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [preview, setPreview] = useState(
    "https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png"
  );

  useLayoutEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((countryRes) => {
      const data = countryRes.data;
      data.forEach((country) => {
        setCountries((prev) => [...prev, country.name]);
      });
    });

    axios
      .get("https://restcountries.com/v3.1/currency/dollar")
      .then((currencyRes) => {
        const currencyData = currencyRes.data;

        currencyData.forEach((currency) => {
          const newData = currency.currencies;

          for (const [key, value] of Object.entries(newData)) {
            if (countryDict[key]) {
              continue;
            }

            countryDict[key] = value.name;
            setCurrencies((prev) => [...prev, key]);
          }
        });
      });
  }, []);

  const [resetComponent, setComponent] = useState(false);

  const resetForm = () => {
    setComponent(true);
    setsellItem({
      itemName: "",
      email: "",
      phone: "",
      condition: "",
      country: "",
      description: "",
    });

    setShowFees({
      shipping: false,
      delivering: false,
    });

    setImage("");

    setPreview(
      "https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png"
    );

    const selects = document.querySelectorAll("select");

    selects.forEach((select) => {
      select.selectedIndex = 0;
    });
    setComponent(false);
  };

  function imagePreview(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function saveItemValues(event) {
    const { name, value } = event.target;

    if (name === "price" || name === "shippingFee" || name === "deliveryFee") {
      const cost = parseFloat(value).toFixed(2);

      setsellItem((prevValue) => {
        return {
          ...prevValue,
          [name]: cost,
        };
      });

      return;
    }

    setsellItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function createSaleItem() {
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setButton(`Uploading...${prog}%`);
      },
      (error) => console.error(error),

      async () => {
        const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
        const currentDate = Date().toString();

        setsellItem((prevVal) => {
          return { ...prevVal, image: imageURL };
        });

        try {
          await setDoc(doc(db, `Users/${uid}/Sales/${sellItem.itemName}`), {
            ...sellItem,
            date: currentDate,
            image: imageURL,
          });

          const modal = await swal({
            title: "Success!",
            text: "Item Successfully Created!",
            icon: "success",
            button: "Ok",
            closeOnClickOutside: false,
            closeOnEsc: false,
          });

          if (modal) {
            resetForm();
          }

          setButton("Submit");
          setState(false);
        } catch (error) {
          swal({
            title: "Error!",
            text: "An Error Occurred!",
            icon: "error",
            button: "Ok",
            closeOnClickOutside: false,
            closeOnEsc: false,
          });
        }
      }
    );
  }

  function checkOptions(e) {
    const value = e.target.checked;

    const name = e.target.id;

    setShowFees((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function verifyPhoneNum(number) {
    try {
      const res = await axios.get(
        `https://api.apilayer.com/number_verification/validate?number=${number}/`,
        { headers: { apikey: "TV1hz15BBYjhRsQXBMPZtYhvWXi2Dv8w" } }
      );

      const data = await res.data;

      if (data.valid === true && data.carrier) {
        setPrevNum({
          value: number,
          valid: true,
        });
        return true;
      }

      setPrevNum({
        value: number,
        valid: false,
      });
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async function verifyEmail(email) {
    try {
      const res = await axios.get(
        `https://emailverification.whoisxmlapi.com/api/v2?apiKey=at_t8L3VT6v08ilz31bDZiNwXDm0Exa1&emailAddress=${email}`
      );

      const data = await res.data;
      if (
        data.formatCheck === "false" ||
        data.freeCheck === "false" ||
        data.dnsCheck === "false" ||
        data.smtpCheck === "false"
      ) {
        setPrevEmail({
          value: email,
          valid: false,
        });

        return false;
      }
      setPrevEmail({
        value: email,
        valid: true,
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async function checkRun() {
    const valuesList = Object.values(sellItem);

    if (
      preview ===
      "https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png"
    ) {
      alert("Add An Image Of The Product!");
      setState(false);
      setButton("Submit");
      return;
    }

    if (!sellItem.currency && sellItem.price) {
      alert("Fill Out All Fields!");
      setState(false);
      setButton("Submit");
      return;
    }

    if (valuesList.includes("")) {
      alert("Fill Out All Fields!");
      setState(false);
      setButton("Submit");
      return;
    }

    setState(true);
    setButton("Verifying...");

    let emailValid = false;
    let phoneValid = false;

    if (prevEmail.value !== sellItem.email) {
      emailValid = await verifyEmail(sellItem.email);
    } else {
      emailValid = prevEmail.valid;
    }

    if (prevNum.value !== sellItem.phone) {
      phoneValid = await verifyPhoneNum(sellItem.phone);
    } else {
      phoneValid = prevNum.valid;
    }

    if (!emailValid) {
      alert("Invalid Email!");
      setState(false);
      setButton("Submit");
      return;
    }

    if (!phoneValid) {
      alert("Invalid Phone Number!");
      setState(false);
      setButton("Submit");
      return;
    }

    createSaleItem();
  }

  return (
    <Zoom in={true}>
      <div
        className="Sell"
        id="sell"
        style={resetComponent && { display: "none" }}
      >
        <form className="sell-form" onSubmit={(e) => e.preventDefault()}>
          <section id="img-sec">
            <button onClick={() => inputRef.current.click()}>
              Upload Image
            </button>
            <input
              ref={inputRef}
              type="file"
              id="inp-img"
              accept="image/png, image/jpeg"
              onChange={imagePreview}
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

          <input
            type="email"
            name="email"
            placeholder="Enter business email"
            onChange={saveItemValues}
            value={sellItem.email}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter business number"
            onChange={saveItemValues}
            value={sellItem.phone}
          />
          <select
            id="country"
            name="country"
            onChange={saveItemValues}
            defaultValue="Select Country of Manufacture"
          >
            <option disabled>Select Country of Manufacture</option>
            {countries.map((country, index) => {
              return (
                <option key={index} value={country}>
                  {country}
                </option>
              );
            })}
          </select>

          <select
            id="select-condition"
            name="condition"
            onChange={saveItemValues}
            defaultValue="Select Item Condition"
          >
            <option disabled>Select Item Condition</option>
            <option>New</option>
            <option>Very Good</option>
            <option>Good </option>
            <option>Acceptable</option>
            <option>Poor</option>
          </select>

          <ul id="transport-opt">
            <li>
              <label htmlFor="shipping">Shipping Available</label>
              <input
                type="checkbox"
                id="shipping"
                name="ship"
                onClick={checkOptions}
              />
            </li>

            <li>
              <label htmlFor="delivering">Delivery Available</label>
              <input
                type="checkbox"
                id="delivering"
                name="delivery"
                onClick={checkOptions}
              />
            </li>
          </ul>

          <section id="pricing">
            <input
              id="sell-price"
              onChange={saveItemValues}
              type="number"
              name="price"
              min="0.00"
              step="0.01"
              placeholder="Enter the selling price..."
            />

            {showFees.shipping && (
              <input
                id="shipping-fee"
                onChange={saveItemValues}
                type="number"
                name="shippingFee"
                min="0.00"
                step="0.01"
                placeholder="Enter Shipping Fee..."
              />
            )}
            {showFees.delivering && (
              <input
                id="delivery-fee"
                onChange={saveItemValues}
                type="number"
                name="deliveryFee"
                min="0.00"
                step="0.01"
                placeholder="Enter Delivery Fee..."
              />
            )}

            <select
              id="currency"
              name="currency"
              onChange={saveItemValues}
              defaultValue="CCY"
            >
              <option disabled>CCY</option>

              {currencies.map((currency, index) => {
                return (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </section>

          {showFees.shipping && (
            <ShippingPlaces
              countries={countries}
              obj={sellItem}
              setObj={setsellItem}
              name="shippingList"
            />
          )}
          {showFees.delivering && (
            <ShippingPlaces
              countries={countries}
              obj={sellItem}
              setObj={setsellItem}
              name="deliveryList"
            />
          )}

          <div>
            <textarea
              onChange={saveItemValues}
              rows="6"
              name="description"
              placeholder="Description..."
              value={sellItem.description}
            />
          </div>

          <Fab
            id="fab2"
            className="fab-but"
            variant="extended"
            onClick={checkRun}
            disabled={buttonState}
          >
            {button}
          </Fab>
        </form>
      </div>
    </Zoom>
  );
}

export default Sell;
