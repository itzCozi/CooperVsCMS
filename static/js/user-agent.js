function isChromeOS() {
  const userAgent = navigator.userAgent;

  return userAgent.includes('CrOS');
}

