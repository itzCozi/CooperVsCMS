function displayErrorPopup() {
  // Shows invalid credentials popup
  document.getElementById("invalid-credentials-popup").style.display = "block";
}

function hideErrorPopup() {
  // Hide invalid credentials popup
  document.getElementById("invalid-credentials-popup").style.display = "none";
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
