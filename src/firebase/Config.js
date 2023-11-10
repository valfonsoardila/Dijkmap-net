// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH2429yGp3Pr1u02N-LDGnIxSYshtdC-Y",
  authDomain: "dijkmap-net.firebaseapp.com",
  projectId: "dijkmap-net",
  storageBucket: "dijkmap-net.appspot.com",
  messagingSenderId: "441771588005",
  appId: "1:441771588005:web:5a6318532080a29f07d04c"
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
export default Firebase;