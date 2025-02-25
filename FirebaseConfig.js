// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCqOzJAZtcqN_PjNgagRXsnXz0wMsKK81o",
//   authDomain: "health-29165.firebaseapp.com",
//   projectId: "health-29165",
//   storageBucket: "health-29165.appspot.com",
//   messagingSenderId: "918805872119",
//   appId: "1:918805872119:web:899ffc3be881f27cb642f2",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqOzJAZtcqN_PjNgagRXsnXz0wMsKK81o",
  authDomain: "health-29165.firebaseapp.com",
  projectId: "health-29165",
  storageBucket: "health-29165.appspot.com",
  messagingSenderId: "918805872119",
  appId: "1:918805872119:web:899ffc3be881f27cb642f2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const auth = getAuth(app);
