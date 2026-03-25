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

const screenshotGallery = document.getElementById('solutions-gallery');
const screenshotCards = screenshotGallery
  ? screenshotGallery.querySelectorAll('.screenshot-card')
  : [];
const featuredPreview = document.querySelector('.product-image img');
const screenshotLightbox = document.getElementById('screenshot-lightbox');
const screenshotLightboxImage = document.getElementById('screenshot-lightbox-image');
const screenshotLightboxTitle = document.getElementById('screenshot-lightbox-title');
const screenshotLightboxClose = document.getElementById('screenshot-lightbox-close');
let lightboxTrigger = null;
let lightboxCloseTimer = null;

if (screenshotCards.length) {
  const setActiveCard = (card) => {
    const thumb = card.querySelector('img');
    if (!thumb) {
      return;
    }

    const nextSrc = thumb.getAttribute('src');
    const nextAlt = thumb.getAttribute('alt');

    if (featuredPreview && nextSrc) {
      featuredPreview.setAttribute('src', nextSrc);
    }

    if (featuredPreview && nextAlt) {
      featuredPreview.setAttribute('alt', nextAlt);
    }

    screenshotCards.forEach((item) => {
      const isActive = item === card;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
  };

  const openLightbox = (card) => {
    if (!screenshotLightbox || !screenshotLightboxImage || !screenshotLightboxTitle) {
      return;
    }

    const thumb = card.querySelector('img');
    const caption = card.querySelector('.screenshot-card-title');
    if (!thumb) {
      return;
    }

    const imageSrc = thumb.getAttribute('src') || '';
    const imageAlt = thumb.getAttribute('alt') || '';
    const imageTitle = caption?.textContent?.trim() || imageAlt || 'Screenshot preview';

    screenshotLightboxImage.setAttribute('src', imageSrc);
    screenshotLightboxImage.setAttribute('alt', imageAlt);
    screenshotLightboxTitle.textContent = imageTitle;
    screenshotLightbox.hidden = false;
    screenshotLightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightboxTrigger = card;

    requestAnimationFrame(() => {
      screenshotLightbox.classList.add('is-open');
    });

    screenshotLightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (!screenshotLightbox || screenshotLightbox.hidden) {
      return;
    }

    screenshotLightbox.classList.remove('is-open');
    screenshotLightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    if (lightboxCloseTimer) {
      window.clearTimeout(lightboxCloseTimer);
    }

    lightboxCloseTimer = window.setTimeout(() => {
      screenshotLightbox.hidden = true;
      if (lightboxTrigger instanceof HTMLElement) {
        lightboxTrigger.focus();
      }
    }, 180);
  };

  screenshotCards.forEach((card) => {
    card.addEventListener('click', () => {
      setActiveCard(card);
      openLightbox(card);
    });
  });

  screenshotLightboxClose?.addEventListener('click', closeLightbox);

  screenshotLightbox?.addEventListener('click', (event) => {
    if (event.target === screenshotLightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && screenshotLightbox && !screenshotLightbox.hidden) {
      event.preventDefault();
      closeLightbox();
    }
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
