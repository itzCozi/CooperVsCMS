function displayErrorPopup() {
  // Shows invalid credentials popup
  document.getElementById("invalid-credentials-popup").style.display = "block";
}

function hideErrorPopup() {
  // Hides invalid credentials popup
  document.getElementById("invalid-credentials-popup").style.display = "none";
  document.getElementById("email-field").value = "";
  document.getElementById("password-field").value = "";
}

function displayInvaildPopup() {
  // Shows invalid input popup
  document.getElementById("invalid-input-popup").style.display = "block";
}

function hideInvalidPopup() {
  // Hide invalid input popup
  document.getElementById("invalid-input-popup").style.display = "none";
  document.getElementById("email-field").value = "";
  document.getElementById("password-field").value = "";
}

function displayWorkingPopup() {
  // Shows valid credentials popup
  document.getElementById("valid-credentials-popup").style.display = "block";
}

function hideWorkingPopup() {
  // Hide valid credentials popup
  document.getElementById("valid-credentials-popup").style.display = "none";
  window.location = "../index.html";
}
