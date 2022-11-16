// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration




const firebaseConfig = {
  apiKey: "AIzaSyCDquZfD9jjzByiu-ub1CGK_UunLLMDBQE",
  authDomain: "electrician-app-ccb74.firebaseapp.com",
  projectId: "electrician-app-ccb74",
  storageBucket: "electrician-app-ccb74.appspot.com",
  messagingSenderId: "736211351765",
  appId: "1:363028951185:web:50cbaee03643524f250f30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { db ,auth};
