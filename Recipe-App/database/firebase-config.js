import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrXTsBeMCAKAvNtb_U_NqFCFq6ZkNWOyU",
  authDomain: "recipe-app-3e7ca.firebaseapp.com",
  projectId: "recipe-app-3e7ca",
  storageBucket: "recipe-app-3e7ca.appspot.com",
  messagingSenderId: "797688939190",
  appId: "1:797688939190:web:f2dafceae53f89af241c17"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
