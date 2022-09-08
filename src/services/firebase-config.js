import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRHlp4fzyFzcKiMFg0eL9MmJxRX6104QI",
  authDomain: "easy-shop-e1209.firebaseapp.com",
  projectId: "easy-shop-e1209",
  storageBucket: "easy-shop-e1209.appspot.com",
  messagingSenderId: "408606671614",
  appId: "1:408606671614:web:78601f023b10be24785baf",
  measurementId: "G-SYDRNJ14SR",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
