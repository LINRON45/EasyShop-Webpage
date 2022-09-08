import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, query, doc, setDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../services/firebase-config";
import { Fab } from "@mui/material";
import { getCookie } from "react-use-cookie";

function Sell() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [button, setButton] = useState('Upload')

  const [sellItem, setsellItem] = useState({
    id: "",
    itemName: "",
    price: "",
    currency: "XCD",
    image: "",
    phone: "",
    shippingFee: "",
    description: "",
    date: "",
  });

  ( ()=>{
    fetch(`http://worldtimeapi.org/api/timezone/America/St_Vincent`)
      .then((res) => res.json())
      .then((y) => y.datetime)
      .then((date) => JSON.stringify(date))
      .then((str) => {
        setsellItem((prevVal) => {
          return {
            ...prevVal,
            date: `${str}`,
          };
        });
      });
  })()


  function ImgChangeValue(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
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
  const currentUser = getCookie("username");

  const storageRef = ref(storage, `${currentUser}/${sellItem.id}`);



  async function CreateItem() {
    const querySnapshot = await getDocs(q);

    // Upload Image to Firebase Storage
    querySnapshot.forEach(async (p) => {
      const imageData = await getDownloadURL(storageRef)
      
      console.log(imageData)
        setsellItem((prevValue) => {
          return {
            ...prevValue,
            image: imageData,
          };
        });
      });

    setButton('Upload')


    ;
  }



  useEffect(async()=>{
    await setDoc(doc(db, `Users/${currentUser}/Sales/${sellItem.id}`), {
      ...sellItem,
    });
  }, [sellItem.image])


  const [buttonState, setState] = useState(null)

  function uploadImg(event){

    event.preventDefault()
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setButton( `Uploading...${prog}%`);        
        setState("true")
      },
      (error) => console.log(error),
      () => {
          window.alert(`finish uploading`)
          setButton("Submit")
          setState("")          

      }
    );

  }



  function Submitfunc(event) {
    event.preventDefault();

    // if (
    //   sellItem.itemName === "" ||
    //   sellItem.price === "" ||
    //   sellItem.phone === ""
    // ) {
    // return;
    // }else{

    // }

    CreateItem();
  }

  return (
    <div className="Sell">
      <form className="sell-form">
        <h1 className="heading">Product Form</h1>
        <hr></hr>

        <input
          onChange={ChangeValue}
          type="text"
          name="itemName"
          placeholder="Enter the name of the item..."
          value={sellItem.itemName}
        />
        <div>
          <input type="file" id="inp-img" accept="image/*" onChange={ImgChangeValue}></input>
        </div>

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

          <select
            onChange={ChangeValue}
            name="currency"
            id="currency"
            value={sellItem.currency}
          >
            <option>XCD</option>
            <option>USD</option>
            <option>AWG</option>
            <option>BSD</option>
            <option>BBD</option>
            <option>BZD</option>
            <option>BMD</option>
            <option>KYD</option>
            <option>CUC</option>
            <option>ANG</option>
            <option>EUR</option>
            <option>GYD</option>
            <option>HTG </option>
            <option>JMD</option>
            <option>SRD</option>
            <option>TTD</option>
          </select>
        </section>

        <input
          onChange={ChangeValue}
          type="tel"
          name="phone"
          placeholder="Enter your number..."
        />

        {/* Can be replaced with availability of shipping to x region/country / posting services if location in x country.
    Add shipping fee input area */}
        <input
          onChange={ChangeValue}
          type="number"
          name="shippingFee"
          min="0.00"
          max="100000.00"
          step="0.01"
          placeholder="Enter Shipping Fee..."
        />

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
          onClick={button === 'Submit'? Submitfunc : uploadImg}

          disabled={buttonState}
        >
          {button}
        </Fab>
      </form>
    </div>
  );
}

export default Sell;
