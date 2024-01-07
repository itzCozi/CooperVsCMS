// Check user auth if the user is logged in or not
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

export function authFunction(){
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
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // If some silly billy changes the address bar to index.html without completing login
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Now you can use onAuthStateChanged in the entire application
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User is signed in: ', user.uid);
        } else {
          console.log('User not authorized, redirecting...');
          console.log(window.location)
          window.location.href = "../../auth/login-page.html";
        }
      });
    })
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });
  };

authFunction();