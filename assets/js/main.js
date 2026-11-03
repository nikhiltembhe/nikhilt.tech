(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  // Reference-style typewriter: type, pause, erase, then rotate the tagline.
  const typewriter = document.getElementById('typewriter');
  const phrases = [
    'build scalable applications.',
    'build full-stack solutions.',
    'solve real-world problems.'
  ];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typewriter) {
    if (reduceMotion) {
      typewriter.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let characterIndex = 0;
      let deleting = false;

      const typeNext = () => {
        const phrase = phrases[phraseIndex];
        typewriter.textContent = phrase.slice(0, characterIndex);

        let delay = deleting ? 42 : 78;
        if (!deleting && characterIndex === phrase.length) {
          deleting = true;
          delay = 1450;
        } else if (deleting && characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 280;
        } else {
          characterIndex += deleting ? -1 : 1;
        }
        window.setTimeout(typeNext, delay);
      };

      typeNext();
    }
  }

  // Teal custom scroll marker at the top-right, matching the supplied reference.
  const scrollMarker = document.querySelector('.scroll-progress');
  const updateScrollMarker = () => {
    if (!scrollMarker) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const travel = Math.max(0, window.innerHeight - scrollMarker.offsetHeight);
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    scrollMarker.style.transform = `translateY(${Math.min(1, Math.max(0, progress)) * travel}px)`;
  };
  window.addEventListener('scroll', updateScrollMarker, { passive: true });
  window.addEventListener('resize', updateScrollMarker);
  updateScrollMarker();

  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
