// Experience detail: headline animations + hero settle

gsap.registerPlugin(ScrollTrigger);

const heroH1 = document.querySelector('.exp-detail-hero h1');
if (heroH1) {
  gsap.fromTo(heroH1,
    { opacity: 0, scale: 0.88, y: 60, clipPath: 'inset(100% 0 0 0)' },
    { opacity: 1, scale: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: heroH1, start: 'top 85%', end: 'top 45%', scrub: 0.5 } }
  );
}

const heroAccent = document.querySelector('.exp-detail-hero .accent');
if (heroAccent) {
  gsap.fromTo(heroAccent,
    { opacity: 0, y: 30 },
    { opacity: 0.85, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: heroAccent, start: 'top 85%', end: 'top 55%', scrub: 0.5 } }
  );
}

// Settle hero image from expanded transition state
const heroImg = document.querySelector('.hero-image img');
if (heroImg) {
  if (sessionStorage.getItem('expTransition')) {
    sessionStorage.removeItem('expTransition');
    gsap.fromTo(heroImg,
      { scale: 1.15 },
      { scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.1 }
    );
  } else {
    gsap.fromTo(heroImg,
      { scale: 1.08 },
      { scale: 1, duration: 1.5, ease: 'power2.out' }
    );
  }
}
