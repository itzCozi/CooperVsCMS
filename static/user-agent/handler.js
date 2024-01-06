if (document.cookie.split(';').some((item) => item.trim().startsWith('handlerVisited='))) {
  console.log('handler.js already executed for this visit.');
} else {
  console.log('Executing handler.js logic...');
  const userAgent = navigator.userAgent;
  console.log(userAgent)

  if (userAgent.includes('CrOS')) {
    console.log('You are using chromeOS')//window.location = 'index.html';
  } else {
    console.log('You are not using ChromeOS')//window.location = 'user-agent/index.html';
  }
  
  // Set the handlerVisited cookie
  document.cookie = 'handlerVisited=true; path=/';
}
