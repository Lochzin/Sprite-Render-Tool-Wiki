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
    
    try {
      // Handle relative URLs
      let fullPath;
      if (href.startsWith('http')) {
        fullPath = new URL(href).pathname;
      } else if (href.startsWith('/')) {
        fullPath = href;
      } else {
        // Relative path - resolve it
        const base = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        fullPath = new URL(href, window.location.origin + base).pathname;
      }
      
      if (fullPath.includes('/pt/')) {
        return 'pt';
      } else if (fullPath.includes('/en/')) {
        return 'en';
      }
    } catch (e) {
      // If URL parsing fails, try simple string check
      if (href.includes('/pt/')) {
        return 'pt';
      } else if (href.includes('/en/')) {
        return 'en';
      }
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
    
    // Find ALL links in the document first
    const allLinks = document.querySelectorAll('a[href]');
    
    let hiddenCount = 0;
    
    // Check each link
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const linkLang = getLinkLanguage(href);
      
      // Only filter links that have a clear language
      if (linkLang && linkLang !== currentLang) {
        // Check if this link is in the navigation area (not in main content)
        const mainContent = document.querySelector('main, .rst-content, article, .content, #content');
        const isInMainContent = mainContent && mainContent.contains(link);
        
        // If not in main content, it's likely a navigation link
        if (!isInMainContent) {
          // Find the best element to hide (prefer list items)
          let elementToHide = link;
          
          // Walk up the DOM tree to find list items or navigation containers
          let parent = link.parentElement;
          let depth = 0;
          while (parent && parent !== document.body && depth < 10) {
            const tagName = parent.tagName;
            const className = parent.className || '';
            
            // Hide list items, navigation items, or navigation containers
            if (tagName === 'LI' || 
                className.includes('nav') || 
                className.includes('menu') || 
                className.includes('sidebar') ||
                className.includes('toctree') ||
                tagName === 'UL' ||
                tagName === 'OL') {
              elementToHide = parent;
              // If we found a UL/OL, we might want to stop here or continue
              if (tagName === 'LI') {
                break; // Prefer hiding the list item
              }
            }
            parent = parent.parentElement;
            depth++;
          }
          
          // Hide the element
          if (elementToHide.style.display !== 'none') {
            elementToHide.style.display = 'none';
            elementToHide.setAttribute('data-filtered-lang', 'true');
            hiddenCount++;
          }
        }
      }
    });
    
  }
  
  // Run when DOM is ready
  function runFilter() {
    filterNavigation();
    // Run multiple times to catch dynamically loaded content
    setTimeout(filterNavigation, 100);
    setTimeout(filterNavigation, 300);
    setTimeout(filterNavigation, 600);
    setTimeout(filterNavigation, 1000);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFilter);
  } else {
    runFilter();
  }
  
  // Also listen for navigation changes (for SPAs or dynamic content)
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      let shouldFilter = false;
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          shouldFilter = true;
        }
      });
      if (shouldFilter) {
        setTimeout(filterNavigation, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Also filter on hash change (some themes use hash navigation)
  window.addEventListener('hashchange', function() {
    setTimeout(filterNavigation, 100);
  });
})();

