function isChromeOS() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('CrOS')) {
    window.location = '/static/index.html';
  } else {
    window.location = '/static/user-agent/index.html';
  }
}