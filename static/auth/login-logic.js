import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// Initialize Firebase with your config
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
const auth = getAuth(app);
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
console.log(auth)

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  console.log(email)
  console.log(password)

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("You have successfully logged in.");
      window.location = "internal/newTab/main.html"
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
});