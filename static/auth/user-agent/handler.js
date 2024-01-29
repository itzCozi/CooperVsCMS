import { authFunction } from "../auth-script.js";

// Check if the user has been redirected in the current session
const hasRedirected = sessionStorage.getItem("redirected");

if (hasRedirected) {
  console.log("Already redirected in this session.");
} else {
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
    // Check if the random number is less than 60% chance
    const shouldRedirect = Math.random() > 0.6;

    if (shouldRedirect) {
      sessionStorage.setItem("redirected", "true");
      window.location.href = "/auth/user-agent/index.html";
      console.log("SENT TO BANISHMENT PAGE");
    } else {
      console.log("Redirect overridden");
    }
  }
}
