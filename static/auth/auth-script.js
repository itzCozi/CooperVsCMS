// Check user auth if the user is logged in or not
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

export function authFunction() {
  // Initialize Firebase with your config
  const firebaseConfig = {
    apiKey: "AIzaSyDCdqFYJy9aXN36hTNNdA-1Ks1oPZj3gE0",
    authDomain: "coopervscms.firebaseapp.com",
    projectId: "coopervscms",
    storageBucket: "coopervscms.appspot.com",
    messagingSenderId: "406730745781",
    appId: "1:406730745781:web:7b537e28c024d898361bfc",
    measurementId: "G-GTTF3XVXW0",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // Set browser session persistence
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Listen for authentication state changes
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in: ", user.uid);
        } else {
          // Check if the current page is not the login page
          if (!window.location.href.includes("/auth/login-page.html")) {
            console.log("User not authorized, redirecting...");
            window.location.href = "/auth/login-page.html";
          } else {
            console.log("Redirect overridden...");
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
}

// Assuming you have some login form in your HTML, let's grab the elements
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const response = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      // Handle successful login, e.g., show a popup or redirect
      const validCredentialsPopup = document.getElementById("valid-credentials-popup");
      const popupContent = validCredentialsPopup.querySelector(".popup-content p");
      popupContent.textContent = `Welcome "${data.user.email}", close this popup to be redirected.`;
      displayWorkingPopup();
    } else {
      // Handle error, e.g., display an error popup
      displayErrorPopup();
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle other errors if needed
  }
});

// Initialize Firebase on the client-side
authFunction();
