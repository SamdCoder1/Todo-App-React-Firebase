import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyATUJ8VtKPawPF2g7E1JTOrqiD7WERGXNQ",
    authDomain: "todo-react-app-33d6c.firebaseapp.com",
    databaseURL: "https://todo-react-app-33d6c-default-rtdb.firebaseio.com",
    projectId: "todo-react-app-33d6c",
    storageBucket: "todo-react-app-33d6c.appspot.com",
    messagingSenderId: "219190745841",
    appId: "1:219190745841:web:ebda4233718f821d4f2750"
  };

  initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { auth, db, provider };