// If user-agent is suspected to be ChromeOS the user will be sent back to index.html
// if not they will continue to be redirected to /user-agent/index.html
import { authFunction } from "../auth-script.js";

if (document.cookie.split(";").some((item) => item.trim().startsWith("handlerVisited="))) {
  console.log("User is using ChromeOS... ACCESS GRANTED");
} else {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("CrOS")) {
    // Set the handlerVisited cookie
    document.cookie = "handlerVisited=true; path=/";
    if (!(window.location.href.includes("/auth/login-page.html")) || window.location.href.includes("/auth/register/register-page.html")) {
      authFunction(); // This script handles all user auth, including user-agent and login
  }
  } else {
    //window.location.href = "/auth/user-agent/index.html";
    console.log("SENT TO BANISHMENT PAGE")
  }
}
