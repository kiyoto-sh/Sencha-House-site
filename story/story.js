// Story page: scroll reveals + founder passage pin/scrub

// Basic fade-up reveals
const revealEls = document.querySelectorAll('.reveal, .fade-up');
revealEls.forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
});

// Founder passage: pin + scrub line-by-line + parallax atmosphere
const founderSection = document.querySelector('#founder');
const founderAtmosphere = document.querySelector('.founder-atmosphere');
const founderLines = document.querySelectorAll('.founder-line');

// Parallax on atmospheric background during the pinned scroll
gsap.to(founderAtmosphere, {
  yPercent: -15,
  scale: 1.1,
  ease: 'none',
  scrollTrigger: {
    trigger: founderSection,
    start: 'top top',
    end: '+=200%',
    scrub: 1,
  },
});

// Pin the section and scrub each line
const founderTl = gsap.timeline({
  scrollTrigger: {
    trigger: founderSection,
    start: 'top top',
    end: '+=200%',
    pin: true,
    scrub: 0.8,
  },
});

// Title fades in first
founderTl.fromTo('.founder-title',
  { opacity: 0, y: 20 },
  { opacity: 0.4, y: 0, duration: 0.15, ease: 'power2.out' },
  0
);

// Each line reveals sequentially
founderLines.forEach((line, i) => {
  founderTl.fromTo(line,
    { opacity: 0.15, y: 20 },
    { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' },
    0.12 + i * 0.18
  );
});

// Lines hold, then fade out gently at the end
founderLines.forEach((line) => {
  founderTl.to(line,
    { opacity: 0.2, duration: 0.1, ease: 'power2.in' },
    0.95
  );
});
