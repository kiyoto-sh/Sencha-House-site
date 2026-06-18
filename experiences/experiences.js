// Experiences index: shared-element expansion + headline animations

gsap.registerPlugin(ScrollTrigger);

// Headline clip-path reveal
const heroH1 = document.querySelector('.experiences-hero h1');
if (heroH1) {
  gsap.fromTo(heroH1,
    { opacity: 0, scale: 0.9, y: 50, clipPath: 'inset(100% 0 0 0)' },
    { opacity: 1, scale: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: heroH1, start: 'top 85%', end: 'top 50%', scrub: 0.5 } }
  );
}

const heroSub = document.querySelector('.experiences-hero .accent');
if (heroSub) {
  gsap.fromTo(heroSub,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: heroSub, start: 'top 85%', end: 'top 55%', scrub: 0.5 } }
  );
}

// Shared-element expansion on click
const expCards = document.querySelectorAll('.exp-card');

expCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const href = card.getAttribute('href');
    const image = card.querySelector('.exp-image img');
    const rect = image.getBoundingClientRect();

    const clone = image.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.objectFit = 'cover';
    clone.style.zIndex = '9999';
    clone.style.transition = 'none';
    document.body.appendChild(clone);

    gsap.to(document.body, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    gsap.to(clone, {
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => {
        sessionStorage.setItem('expTransition', 'true');
        window.location.href = href;
      },
    });
  });
});
