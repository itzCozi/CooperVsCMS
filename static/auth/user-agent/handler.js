import { authFunction } from "../auth-script.js";

const redirect = true; // redirect RN

const hasRedirected = document.cookie.includes("handlerVisited=true");
const userAgent = navigator.userAgent;

if (userAgent.includes("CrOS")) {
  // Set the handlerVisited cookie
  document.cookie = "handlerVisited=true; path=/";
  if (
    window.location.href.includes("/auth/login-page.html") ||
    window.location.href.includes("/auth/register/register-page.html") ||
    window.location.href.includes("/auth/anon/anon-login.html")
  ) {
    console.log("Already on an auth page (either login-page or register-page)");
  } else {
    authFunction(); // This script handles all user auth, including user-agent and login
  }
} else {
  if (redirect == true) {
    window.location.href = "/auth/user-agent/index.html";
    console.log("SENT TO BANISHMENT PAGE");
  } else {
    console.log("Redirect overridden");
  }
}
