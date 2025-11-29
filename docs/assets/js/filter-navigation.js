// Filter navigation by language
(function() {
  'use strict';
  
  // Detect current language from URL
  function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/pt/')) {
      return 'pt';
    } else if (path.includes('/en/')) {
      return 'en';
    }
    return null; // Root page
  }
  
  // Normalize href to check language
  function getLinkLanguage(href) {
    if (!href) return null;
    
    // Handle relative URLs
    const fullPath = href.startsWith('http') ? href : new URL(href, window.location.origin).pathname;
    
    if (fullPath.includes('/pt/')) {
      return 'pt';
    } else if (fullPath.includes('/en/')) {
      return 'en';
    }
    return null;
  }
  
  // Hide navigation items that don't match current language
  function filterNavigation() {
    const currentLang = getCurrentLanguage();
    
    // If we're on root page, don't filter
    if (!currentLang) {
      return;
    }
    
    // Find all navigation links - try multiple strategies
    let navLinks = [];
    
    // Strategy 1: Look for common navigation containers
    const navContainers = [
      'aside',
      'nav',
      '.sidebar',
      '.wy-menu-vertical',
      '.wy-side-nav-search',
      '.rst-versions',
      '.toctree-wrapper',
      '[role="navigation"]',
      '.nav-sidebar',
      '.sidebar-nav'
    ];
    
    navContainers.forEach(selector => {
      const container = document.querySelector(selector);
      if (container) {
        const links = container.querySelectorAll('a[href]');
        navLinks.push(...Array.from(links));
      }
    });
    
    // Strategy 2: Find all links and filter by context (if they're in navigation areas)
    if (navLinks.length === 0) {
      const allLinks = document.querySelectorAll('a[href]');
      allLinks.forEach(link => {
        // Check if link is likely in navigation (not in main content)
        const isInNav = link.closest('aside, nav, .sidebar, header, footer, .wy-menu, .toctree');
        if (isInNav) {
          navLinks.push(link);
        }
      });
    }
    
    // Remove duplicates
    navLinks = [...new Set(navLinks)];
    
    // Filter links based on language
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkLang = getLinkLanguage(href);
      
      // Hide if link points to the other language
      if (linkLang && linkLang !== currentLang) {
        // Hide the link and its parent list item if it's in a list
        let elementToHide = link;
        
        // Try to find parent <li> to hide entire list item
        let parent = link.parentElement;
        while (parent && parent !== document.body) {
          if (parent.tagName === 'LI' || parent.classList.contains('nav-item') || parent.classList.contains('toctree-l1') || parent.classList.contains('toctree-l2') || parent.classList.contains('toctree-l3')) {
            elementToHide = parent;
            break;
          }
          parent = parent.parentElement;
        }
        
        elementToHide.style.display = 'none';
      }
    });
  }
  
  // Run when DOM is ready
  function runFilter() {
    filterNavigation();
    // Also run after a delay to catch dynamically loaded content
    setTimeout(filterNavigation, 200);
    setTimeout(filterNavigation, 500);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFilter);
  } else {
    runFilter();
  }
  
  // Also listen for navigation changes (for SPAs or dynamic content)
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      filterNavigation();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();

