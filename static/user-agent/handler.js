if (document.cookie.split(';').some((item) => item.trim().startsWith('handlerVisited='))) {
  console.log('handler.js already executed for this visit.');
} else {
  console.log('Executing handler.js logic...');
  const userAgent = navigator.userAgent;
  console.log(userAgent)

  if (userAgent.includes('CrOS')) {
    // Set the handlerVisited cookie
    document.cookie = 'handlerVisited=true; path=/';
    window.location = 'index.html';
  } else {
    window.location = 'user-agent/index.html';
  }
}
