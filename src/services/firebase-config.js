import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRHlp4fzyFzcKiMFg0eL9MmJxRX6104QI",
  authDomain: "easy-shop-e1209.firebaseapp.com",
  databaseURL: "https://easy-shop-e1209-default-rtdb.firebaseio.com",
  projectId: "easy-shop-e1209",
  storageBucket: "easy-shop-e1209.appspot.com",
  messagingSenderId: "408606671614",
  appId: "1:408606671614:web:78601f023b10be24785baf",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
