// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4N1Gad48pyXT-5PCk_I62x7pIRfIgUHE",
  authDomain: "huongnghiepnhanh.firebaseapp.com",
  databaseURL: "https://huongnghiepnhanh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "huongnghiepnhanh",
  storageBucket: "huongnghiepnhanh.appspot.com",
  messagingSenderId: "1081711875024",
  appId: "1:1081711875024:web:f7d5e654a08678ee77dfd5",
  measurementId: "G-3EEPS762RE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);