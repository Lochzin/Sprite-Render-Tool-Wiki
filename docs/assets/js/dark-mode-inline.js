// Inline script to load dark mode - works automatically
(function() {
  'use strict';
  
  // Get base URL from current page
  var baseUrl = window.location.pathname.split('/').slice(0, -1).join('/') || '';
  if (baseUrl && !baseUrl.endsWith('/')) baseUrl += '/';
  if (!baseUrl.startsWith('/')) baseUrl = '/' + baseUrl;
  
  // Load CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = baseUrl + 'assets/css/dark-mode.css';
  document.head.appendChild(link);
  
  // Load JS
  var script = document.createElement('script');
  script.src = baseUrl + 'assets/js/dark-mode.js';
  script.defer = true;
  document.head.appendChild(script);
})();

