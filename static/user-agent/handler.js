// If user-agent is suspected to be ChromeOS the user will be sent back to index.html
// if not they will continue to be redirected to /user-agent/index.html

if (document.cookie.split(';').some((item) => item.trim().startsWith('handlerVisited='))) {
  console.log('handler.js already executed for this visit.');
}

else {
  console.log('Executing handler.js logic...');
  const userAgent = navigator.userAgent;

  if (userAgent.includes('CrOS')) {
    // Set the handlerVisited cookie
    document.cookie = 'handlerVisited=true; path=/';

    window.location = 'index.html';
  } else {
    window.location = 'user-agent/index.html';
  }
}
