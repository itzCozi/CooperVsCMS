// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCdqFYJy9aXN36hTNNdA-1Ks1oPZj3gE0",
  authDomain: "coopervscms.firebaseapp.com",
  projectId: "coopervscms",
  storageBucket: "coopervscms.appspot.com",
  messagingSenderId: "406730745781",
  appId: "1:406730745781:web:7b537e28c024d898361bfc",
  measurementId: "G-GTTF3XVXW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);