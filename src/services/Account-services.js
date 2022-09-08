import { db } from "./firebase-config";

import { getDoc, setDoc, doc } from "firebase/firestore";

class Accounts_Services {
  addAccount = (id, Data) => {
    return setDoc(doc(db, "Users", id), Data);
  };

  getAccount = (id) => {
    const UserAccount = doc(db, "Users", id);
    return getDoc(UserAccount);
  };
}

export default new Accounts_Services();
