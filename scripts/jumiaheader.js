document.addEventListener('DOMContentLoaded', () => {
  const hamburgerIcon = document.querySelector('.hamburger-mobile i');
  const hamburgerBtn = document.querySelector('.hamburger-mobile');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const overlay = document.querySelector('.mobile-overlay');

  const dropdownToggles = Array.from(document.querySelectorAll('.dropdown-click .dropdown-toggle'));

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-panel').forEach((p) => {
      p.style.display = 'none';
    });
    dropdownToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
  }

  function openMenu() {
    mobileMenu.classList.add('show');
    overlay.classList.add('show');
    if (hamburgerIcon) {
      hamburgerIcon.classList.remove('fa-bars');
      hamburgerIcon.classList.add('fa-xmark');
    }
    closeAllDropdowns();
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('show');
    overlay.classList.remove('show');
    if (hamburgerIcon) {
      hamburgerIcon.classList.remove('fa-xmark');
      hamburgerIcon.classList.add('fa-bars');
    }
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', () => {
    if (mobileMenu.classList.contains('show')) closeMenu();
    else openMenu();
  });

  mobileClose?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const container = toggle.closest('.dropdown-click');
      const panel = container.querySelector('.dropdown-panel');

      const isOpen = panel.style.display === 'block';

      document.querySelectorAll('.dropdown-panel').forEach((p) => {
        if (p !== panel) p.style.display = 'none';
      });
      dropdownToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));

      panel.style.display = isOpen ? 'none' : 'block';
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-click')) return;

    if (e.target.closest('.mobile-menu')) return;

    closeAllDropdowns();
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeAllDropdowns();
      closeMenu();
    }
  });


  window.addEventListener('resize', () => {

    if (window.innerWidth <= 759) closeAllDropdowns();

    if (!mobileMenu.classList.contains('show') && hamburgerIcon) {
      hamburgerIcon.classList.remove('fa-xmark');
      hamburgerIcon.classList.add('fa-bars');
    }
  });
});
