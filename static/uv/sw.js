// Auth script for uv/service/
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in: ', user.uid);
  } else {
    console.log('Your not crafty bro...');
    window.location.href = "auth/login-page.html";
  }
});

importScripts('/uv/uv.sw.js');
const sw = new UVServiceWorker();

self.addEventListener('fetch', event => {
  event.respondWith(sw.fetch(event));
});
