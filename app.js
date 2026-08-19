/* ==========================================================================
   Arrow Twist - Privacy Policy Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTocObserver();
  initSearch();
  initCopySectionLinks();
  initDataSafetyModal();
});

/* Theme Toggle (Dark / Light) */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('arrow_twist_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('arrow_twist_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const iconContainer = document.getElementById('themeIcon');
  if (!iconContainer) return;

  if (theme === 'dark') {
    iconContainer.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81 .89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z"/>
      </svg>
    `;
  } else {
    iconContainer.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zM18.36 5.99l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"/>
      </svg>
    `;
  }
}

/* Intersection Observer for Table of Contents Links */
function initTocObserver() {
  const sections = document.querySelectorAll('.policy-section');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (!sections.length || !tocLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* Search Filtering */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const sections = document.querySelectorAll('.policy-section');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    sections.forEach(section => {
      const text = section.textContent.toLowerCase();
      if (query === '' || text.includes(query)) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

/* Copy Direct Section Link */
function initCopySectionLinks() {
  const copyButtons = document.querySelectorAll('.copy-section-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = btn.closest('.policy-section');
      const sectionId = section.getAttribute('id');
      const fullUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`;

      navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('Section link copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy link.');
      });
    });
  });
}

/* Data Safety Modal */
function initDataSafetyModal() {
  const openBtn = document.getElementById('openDataSafetyBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('dataSafetyModal');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => modal.classList.add('open'));
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  const copySnippetBtns = document.querySelectorAll('.copy-snippet-btn');
  copySnippetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const snippetId = btn.dataset.snippetTarget;
      const snippetEl = document.getElementById(snippetId);
      if (snippetEl) {
        navigator.clipboard.writeText(snippetEl.innerText).then(() => {
          showToast('Play Console response copied!');
        });
      }
    });
  });
}

/* Toast Utility */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0EA5E9">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
