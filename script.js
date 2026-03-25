const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const featuredPreview = document.querySelector('.product-image img');
const screenshotCards = document.querySelectorAll('.screenshot-card');

if (featuredPreview && screenshotCards.length) {
  const setActiveCard = (card) => {
    const thumb = card.querySelector('img');
    if (!thumb) {
      return;
    }

    const nextSrc = thumb.getAttribute('src');
    const nextAlt = thumb.getAttribute('alt');

    if (nextSrc) {
      featuredPreview.setAttribute('src', nextSrc);
    }

    if (nextAlt) {
      featuredPreview.setAttribute('alt', nextAlt);
    }

    screenshotCards.forEach((item) => {
      const isActive = item === card;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
  };

  screenshotCards.forEach((card) => {
    card.addEventListener('click', () => setActiveCard(card));
  });
}

const contactForm = document.querySelector('#contact .contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = contactForm.elements.namedItem('name')?.value.trim() || '';
    const workEmail = contactForm.elements.namedItem('email')?.value.trim() || '';
    const projectDetails = contactForm.elements.namedItem('message')?.value.trim() || '';

    const whatsappMessage = `Hello AMM Systems,

My name is ${fullName}
My email is ${workEmail}

Project details:
${projectDetails}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/923214317757?text=${encodedMessage}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener');

    if (!whatsappWindow) {
      window.location.href = whatsappUrl;
    }
  });
}

const miniCta = document.getElementById('mini-cta');
const heroSection = document.querySelector('.hero');

if (miniCta) {
  const updateMiniCta = () => {
    const threshold = heroSection
      ? heroSection.offsetTop + heroSection.offsetHeight * 0.75
      : 480;
    const shouldShow = window.scrollY > threshold;
    miniCta.classList.toggle('is-visible', shouldShow);
    miniCta.setAttribute('aria-hidden', String(!shouldShow));
  };

  window.addEventListener('scroll', updateMiniCta, { passive: true });
  window.addEventListener('resize', updateMiniCta);
  updateMiniCta();
}
