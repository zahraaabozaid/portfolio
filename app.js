/* ==========================================================================
   APP.JS - Modern Interactivity & Calming Animations
   Alzahraa Abozaid Elsayed - Computer Science Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Premium Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ------------------------------------------------------------------------
  // 1. Dark/Light Mode Theme Switcher
  // ------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  // Retrieve saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme) {
    bodyElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersLight) {
    bodyElement.setAttribute('data-theme', 'light');
  } else {
    bodyElement.setAttribute('data-theme', 'dark'); // Default
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = bodyElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Smooth Transition Effect
    bodyElement.style.transition = 'background-color 0.6s ease, color 0.6s ease';
    bodyElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  // ------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation Menu
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close Mobile Drawer when any link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // Close Menu if clicked outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
      mobileToggle.classList.remove('open');
      navMenu.classList.remove('open');
    }
  });

  // ------------------------------------------------------------------------
  // 3. Sticky Header & Active Link Indicator on Scroll
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add border and background opacity on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll active link highlight logic
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // Offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. Ambient Glow Blob Mouse-Follower (Subtle Micro-Interaction)
  // ------------------------------------------------------------------------
  const heroSection = document.getElementById('hero');
  const ambientBlob1 = document.querySelector('.ambient-1');

  if (heroSection && ambientBlob1) {
    heroSection.addEventListener('mousemove', (e) => {
      // Calculate mouse percentage relative to hero container
      const rect = heroSection.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Map positions with smoothing boundary
      const xPercent = (mouseX / rect.width) * 100;
      const yPercent = (mouseY / rect.height) * 100;

      // Adjust positions of the ambient gradient subtly
      ambientBlob1.style.transform = `translate(${xPercent * 0.2}px, ${yPercent * 0.2}px)`;
    });
  }

  // ------------------------------------------------------------------------
  // 5. Technical Skills Filtering Tabs
  // ------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active Button Styling
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
          // Fade in and show
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          // Fade out and hide
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9) translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add CSS transition rules inline for perfect performance on filter action
  skillCards.forEach(card => {
    card.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease';
  });

  // ------------------------------------------------------------------------
  // 6. Secondary Systems Projects Drawer (Slide-Toggle)
  // ------------------------------------------------------------------------
  const toggleProjectsBtn = document.getElementById('toggle-more-projects');
  const moreProjectsDrawer = document.getElementById('more-projects-drawer');
  const drawerArrow = document.getElementById('drawer-arrow');

  if (toggleProjectsBtn && moreProjectsDrawer) {
    toggleProjectsBtn.addEventListener('click', () => {
      moreProjectsDrawer.classList.toggle('open');

      const isOpen = moreProjectsDrawer.classList.contains('open');

      if (isOpen) {
        toggleProjectsBtn.innerHTML = `Hide Systems Projects <i data-lucide="chevron-up" id="drawer-arrow"></i>`;
        toggleProjectsBtn.style.background = 'rgba(168, 85, 247, 0.08)';
        toggleProjectsBtn.style.borderColor = 'var(--accent-secondary)';
      } else {
        toggleProjectsBtn.innerHTML = `Show More Systems Projects <i data-lucide="chevron-down" id="drawer-arrow"></i>`;
        toggleProjectsBtn.style.background = 'rgba(255, 255, 255, 0.01)';
        toggleProjectsBtn.style.borderColor = 'var(--border-color)';
      }

      // Re-instantiate icons inside the button
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. Interactive Scroll Reveal (Intersection Observer)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once active so animation doesn't loop
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12, // Element is 12% in viewport before trigger
    rootMargin: '0px 0px -40px 0px' // Margins around viewport
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ------------------------------------------------------------------------
  // 8. Copy-to-Clipboard Email Utility
  // ------------------------------------------------------------------------
  const emailCard = document.getElementById('email-card');
  const copyStatus = document.getElementById('copy-status');

  if (emailCard && copyStatus) {
    emailCard.addEventListener('click', () => {
      const emailText = 'zahraaabozaid06@gmail.com';
      
      // Use Clipboard API
      navigator.clipboard.writeText(emailText).then(() => {
        copyStatus.classList.add('show');
        emailCard.style.borderColor = 'var(--accent-primary)';
        
        // Hide badge after 2.5 seconds
        setTimeout(() => {
          copyStatus.classList.remove('show');
          emailCard.style.borderColor = 'var(--glass-border)';
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 9. Premium Interactive Form Submission Handling
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatusMsg = document.getElementById('form-status-msg');

  if (contactForm && formStatusMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Status visual transition (Loading state)
      formStatusMsg.className = 'form-status';
      formStatusMsg.style.display = 'block';
      formStatusMsg.style.color = 'var(--text-secondary)';
      formStatusMsg.innerHTML = `<i data-lucide="loader" class="spin" style="vertical-align: middle; display: inline-block; animation: float-slow 1s infinite linear;"></i> Establishing connection and sending secure dispatch...`;
      
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Simulate API network latency (1.8s) for a modern, high-fidelity experience
      setTimeout(() => {
        // Success display
        formStatusMsg.className = 'form-status success';
        formStatusMsg.innerHTML = `<i data-lucide="check-circle" style="vertical-align: middle; display: inline-block; margin-right: 4px;"></i> Secure connection established. Thank you, <strong>${name}</strong>! Your message has been sent to Alzahraa successfully.`;
        
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        // Reset form inputs
        contactForm.reset();

        // Clear success message after 8 seconds
        setTimeout(() => {
          formStatusMsg.style.opacity = '0';
          formStatusMsg.style.transition = 'opacity 0.6s ease';
          setTimeout(() => {
            formStatusMsg.style.display = 'none';
            formStatusMsg.style.opacity = '1';
          }, 600);
        }, 8000);

      }, 1800);
    });
  }

  // ------------------------------------------------------------------------
  // 10. Interactive Certifications Add Action
  // ------------------------------------------------------------------------
  const addCertBtn = document.getElementById('add-cert-placeholder');
  if (addCertBtn) {
    addCertBtn.addEventListener('click', () => {
      // Prompt user to add a mock certificate
      const certName = prompt("Enter Name of Professional Certification (e.g., AWS Cloud Practitioner):");
      const certOrg = prompt("Enter Certifying Organization (e.g., Amazon Web Services):");
      
      if (certName && certOrg) {
        // Create new certificate item structure
        const certItem = document.createElement('div');
        certItem.className = 'cert-item reveal active';
        certItem.style.opacity = '0';
        certItem.style.transform = 'translateX(-10px)';
        certItem.style.transition = 'all 0.5s ease';
        
        certItem.innerHTML = `
          <h4 class="cert-item-title">${certName}</h4>
          <p class="cert-item-org">${certOrg}</p>
          <p class="cert-item-date">Successfully Added - Verified Credential</p>
        `;
        
        // Insert right before the placeholder button
        addCertBtn.parentNode.insertBefore(certItem, addCertBtn);
        
        setTimeout(() => {
          certItem.style.opacity = '1';
          certItem.style.transform = 'translateX(0)';
        }, 50);
      }
    });
  }
});
