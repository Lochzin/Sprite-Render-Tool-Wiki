// Dark Mode Toggle Script

(function() {
  'use strict';

  // Check for saved theme preference or default to system preference
  function getThemePreference() {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Apply theme
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      updateToggleIcon(true);
    } else {
      document.body.classList.remove('dark-mode');
      updateToggleIcon(false);
    }
  }

  // Update toggle button icon
  function updateToggleIcon(isDark) {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('svg');
    if (!icon) return;

    if (isDark) {
      // Sun icon (to switch to light)
      icon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/>';
    } else {
      // Moon icon (to switch to dark)
      icon.innerHTML = '<path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-13.1-6.66-8.32-14.96z"/>';
    }
  }

  // Toggle theme
  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    const newTheme = !isDark;
    applyTheme(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
  }

  // Create toggle button
  function createToggleButton() {
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.className = 'dark-mode-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.setAttribute('title', 'Toggle dark mode');
    
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'currentColor');
    toggle.appendChild(icon);
    
    toggle.addEventListener('click', toggleTheme);
    document.body.appendChild(toggle);
  }

  // Initialize
  function init() {
    const isDark = getThemePreference();
    applyTheme(isDark);
    createToggleButton();
    
    // Listen for system theme changes (if no manual preference is set)
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', function(e) {
        if (localStorage.getItem('darkMode') === null) {
          applyTheme(e.matches);
        }
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

