if (document.cookie.split(';').some((item) => item.trim().startsWith('handlerVisited='))) {
  console.log('handler.js already executed for this visit.');
} else {
  console.log('Executing handler.js logic...');
  const userAgent = navigator.userAgent;

  if (userAgent.includes('CrOS')) {
    window.location = 'index.html';
  } else {
    window.location = 'user-agent/index.html';
  }
  
  // Set the handlerVisited cookie
  document.cookie = 'handlerVisited=true; path=/';
}
