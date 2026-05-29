document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // --- 1. CORE CONTENT PROTECTION SUITE ---
  // ==========================================
  const toast = document.getElementById('toast');
  
  // Custom Function to trigger your beautiful UI Toast Notification
  const showSecurityToast = (message) => {
    if (toast) {
      toast.innerText = message || "Content protection enabled";
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }
  };

  // A. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showSecurityToast('Content protection enabled.');[cite: 1]
  });

  // B. Disable Image Dragging to Local Desktop/Tabs
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());[cite: 1]
  });

  // C. Disable Content Copying & Text Selection via Keyboard/Mouse
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    showSecurityToast('Copying content is restricted.');
  });

  document.addEventListener('cut', (e) => {
    e.preventDefault();
    showSecurityToast('Cutting content is restricted.');
  });

  // D. Restrict Common Screenshot, Print, and DevTools Shortcuts
  document.addEventListener('keydown', (e) => {
    // Detect Print Commands (Ctrl+P / Cmd+P)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      showSecurityToast('Printing this portfolio is restricted.');
    }

    // Detect Copy/Cut Keyboard Commands (Ctrl+C, Ctrl+X, Cmd+C, Cmd+X)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x')) {
      e.preventDefault();
      showSecurityToast('Text duplication is disabled.');
    }

    // Discard Windows Snipping Tool / Mac Screenshot key combinations where accessible
    if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || e.key === 'F12') {
      showSecurityToast('Developer inspections are restricted.');
    }
  });

  // E. Mitigate Print-Screen / Screenshot attempts via Focus Loss
  // While JS cannot block hardware OS buttons, resetting view state on blur protects your data
  window.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText(''); // Clear clipboard immediately
      showSecurityToast('Screenshots are restricted.');
    }
  });


  // ==========================================
  // --- 2. DYNAMIC MOBILE NAVBAR SYSTEM ---
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }


  // ==========================================
  // --- 3. INTERSECTION OBSERVER ANIMATIONS ---
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearanceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, fadeOptions);

  fadeElements.forEach(element => {
    appearanceObserver.observe(element);
  });
});
