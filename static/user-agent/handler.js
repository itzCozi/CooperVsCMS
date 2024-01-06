function isChromeOS() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('CrOS')) {
    window.location = 'index.html';
  } else {
    window.location = '/index.html';
  }
}